// @vitest-environment node
import { describe, expect, it, vi } from "vitest";

const { getPage, getPerformancePage, getInfrastructurePage, cheatSheetPage } = vi.hoisted(() => ({
  getPage: vi.fn(),
  getPerformancePage: vi.fn(),
  getInfrastructurePage: vi.fn(),
  cheatSheetPage: {
    title: "Interface Design Cheat Sheet",
    description: "Guidelines",
    getText: vi.fn().mockResolvedValue("## Colors\n\nUse tokens"),
  },
}));
vi.mock("@/lib/source", () => ({
  source: { getPage },
  performanceSource: { getPage: getPerformancePage },
  infrastructureSource: { getPage: getInfrastructurePage },
  cheatSheetPage,
}));

import { GET } from "@/app/api/markdown/[[...slug]]/route";

const call = (slug?: string[]) =>
  GET(new Request("http://localhost/api/markdown"), { params: Promise.resolve({ slug }) });

describe("Markdown export", () => {
  it("exports page metadata and portable Markdown", async () => {
    const getText = vi.fn().mockResolvedValue("## Foundations\n\nSample content");
    getPage.mockReturnValue({ data: { title: "Introduction", description: "A shared language", getText } });
    const response = await call(["design-system-guide", "index"]);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await response.text()).toBe("# Introduction\n\nA shared language\n\n## Foundations\n\nSample content");
    expect(getText).toHaveBeenCalledWith("raw");
    expect(getPage).toHaveBeenCalledWith(["index"]);
  });

  it("serves each handbook part from its own source", async () => {
    const getText = vi.fn().mockResolvedValue("Use WOFF2");
    getPerformancePage.mockReturnValue({ data: { title: "3.4 Use WOFF2", description: "Smaller", getText } });
    const response = await call(["frontend-performance", "woff2"]);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("# 3.4 Use WOFF2\n\nSmaller\n\nUse WOFF2");
    expect(getPerformancePage).toHaveBeenCalledWith(["woff2"]);
  });

  it("serves the infrastructure part from its own source", async () => {
    const getText = vi.fn().mockResolvedValue("DNS maps names to addresses");
    getInfrastructurePage.mockReturnValue({
      data: { title: "1.3 DNS and Domains", description: "Names to addresses", getText },
    });
    const response = await call(["frontend-infrastructure", "dns"]);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(
      "# 1.3 DNS and Domains\n\nNames to addresses\n\nDNS maps names to addresses",
    );
    expect(getInfrastructurePage).toHaveBeenCalledWith(["dns"]);
  });

  it("serves the single-page cheat sheet", async () => {
    const response = await call(["cheat-sheet"]);

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("# Interface Design Cheat Sheet\n\nGuidelines\n\n## Colors\n\nUse tokens");
  });

  it("returns 404 for an unknown document", async () => {
    getPage.mockReturnValue(undefined);
    const response = await call(["design-system-guide", "missing"]);
    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not found");
  });

  it("returns 404 for an unknown handbook part", async () => {
    const response = await call(["not-a-part", "page"]);
    expect(response.status).toBe(404);
  });
});
