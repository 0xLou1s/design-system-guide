// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

const { getPage } = vi.hoisted(() => ({ getPage: vi.fn() }));
vi.mock("@/lib/source", () => ({ source: { getPage } }));

import { GET } from "@/app/api/markdown/[[...slug]]/route";

describe("Markdown export", () => {
  it("exports page metadata and portable Markdown", async () => {
    const getText = vi.fn().mockResolvedValue("## Foundations\n\nSample content");
    getPage.mockReturnValue({ data: { title: "Introduction", description: "A shared language", getText } });
    const response = await GET(new Request("http://localhost/api/markdown"), { params: Promise.resolve({}) });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await response.text()).toBe("# Introduction\n\nA shared language\n\n## Foundations\n\nSample content");
    expect(getText).toHaveBeenCalledWith("raw");
  });

  it("returns 404 for an unknown document", async () => {
    getPage.mockReturnValue(undefined);
    const response = await GET(new Request("http://localhost/api/markdown/missing"), {
      params: Promise.resolve({ slug: ["missing"] }),
    });
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not found");
    expect(getPage).toHaveBeenCalledWith(["missing"]);
  });
});
