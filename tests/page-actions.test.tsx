import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { PageActions } from "@/components/page-actions";

const markdownUrl = "/api/markdown/";
const githubUrl = "https://github.com/0xLou1s/design-system-guide/blob/main/content/docs/index.mdx";

function renderActions() {
  const user = userEvent.setup();
  render(<PageActions markdownUrl={markdownUrl} githubUrl={githubUrl} />);
  return user;
}

describe("page actions", () => {
  it("keeps all upstream Open options and adds View Markdown", async () => {
    const user = renderActions();
    await user.click(screen.getByRole("button", { name: "Open" }));

    expect(screen.getByRole("link", { name: /View Markdown/ })).toHaveAttribute("href", markdownUrl);
    expect(screen.getByRole("link", { name: /Open in GitHub/ })).toHaveAttribute("href", githubUrl);

    for (const [name, origin] of [
      ["Scira AI", "https://scira.ai"],
      ["ChatGPT", "https://chatgpt.com"],
      ["Claude", "https://claude.ai"],
      ["T3 Chat", "https://t3.chat"],
    ]) {
      const link = screen.getByRole("link", { name: new RegExp(`Open in ${name}`) });
      const url = new URL(link.getAttribute("href")!);
      expect(url.origin).toBe(origin);
      expect(url.searchParams.get("q")).toContain("http://localhost:3001/api/markdown/");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer noopener");
    }

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("link", { name: /View Markdown/ })).not.toBeInTheDocument());
  });

  it("copies the loaded Markdown", async () => {
    const user = renderActions();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const fetchMarkdown = vi.fn().mockResolvedValue(new Response("# Introduction\n\nSample docs"));
    vi.stubGlobal("fetch", fetchMarkdown);

    await user.click(screen.getByRole("button", { name: "Copy Markdown" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("# Introduction\n\nSample docs"));
    expect(fetchMarkdown).toHaveBeenCalledWith(markdownUrl);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a fallback and allows retry when Markdown cannot be loaded", async () => {
    const user = renderActions();
    const writeText = vi.spyOn(navigator.clipboard, "writeText");
    const fetchMarkdown = vi.fn()
      .mockResolvedValueOnce(new Response("Unavailable", { status: 500 }))
      .mockResolvedValueOnce(new Response("# Recovered"));
    vi.stubGlobal("fetch", fetchMarkdown);

    await user.click(screen.getByRole("button", { name: "Copy Markdown" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Use Open");
    expect(writeText).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Copy Markdown" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("# Recovered"));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows a fallback if clipboard permission is denied", async () => {
    const user = renderActions();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("# Introduction")));
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new DOMException("Denied", "NotAllowedError"));

    await user.click(screen.getByRole("button", { name: "Copy Markdown" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Use Open");
    expect(screen.getByRole("button", { name: "Copy Markdown" })).toBeEnabled();
  });
});
