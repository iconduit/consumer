const { resolveUrl } = require("../../src/url.js");

describe("resolveUrl()", () => {
  it("should support resolving against absolute URLs", () => {
    expect(resolveUrl("https://iconduit.github.io/", ".")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io/", "/")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io", ".")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io", "/")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "/")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "x")).toBe(
      "https://iconduit.github.io/p/a/t/x",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h/", "x")).toBe(
      "https://iconduit.github.io/p/a/t/h/x",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "x/")).toBe(
      "https://iconduit.github.io/p/a/t/x/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "x/y")).toBe(
      "https://iconduit.github.io/p/a/t/x/y",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "x?y#z")).toBe(
      "https://iconduit.github.io/p/a/t/x?y#z",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", ".")).toBe(
      "https://iconduit.github.io/p/a/t/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "./x")).toBe(
      "https://iconduit.github.io/p/a/t/x",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "..")).toBe(
      "https://iconduit.github.io/p/a/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "../x")).toBe(
      "https://iconduit.github.io/p/a/x",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "../../..")).toBe(
      "https://iconduit.github.io/",
    );
    expect(resolveUrl("https://iconduit.github.io/p/a/t/h", "../../../x")).toBe(
      "https://iconduit.github.io/x",
    );
    expect(
      resolveUrl("https://iconduit.github.io/p/a/t/h", "../../../.."),
    ).toBe("https://iconduit.github.io/");
    expect(
      resolveUrl("https://iconduit.github.io/p/a/t/h", "../../../../x"),
    ).toBe("https://iconduit.github.io/x");
  });

  it("should support resolving against relative URLs with a leading slash", () => {
    expect(resolveUrl("/", "")).toBe("/");
    expect(resolveUrl("/", ".")).toBe("/");
    expect(resolveUrl("/", "/")).toBe("/");
    expect(resolveUrl("/", "/x/y")).toBe("/x/y");
    expect(resolveUrl("/p/a/t/h", "")).toBe("/p/a/t/h");
    expect(resolveUrl("/p/a/t/h", "/x/y")).toBe("/x/y");
    expect(resolveUrl("/p/a/t/h", "x")).toBe("/p/a/t/x");
    expect(resolveUrl("/p/a/t/h/", "x")).toBe("/p/a/t/h/x");
    expect(resolveUrl("/p/a/t/h", "x/")).toBe("/p/a/t/x/");
    expect(resolveUrl("/p/a/t/h", "x/y")).toBe("/p/a/t/x/y");
    expect(resolveUrl("/p/a/t/h", "x?y#z")).toBe("/p/a/t/x?y#z");
    expect(resolveUrl("/p/a/t/h", ".")).toBe("/p/a/t/");
    expect(resolveUrl("/p/a/t/h", "./x")).toBe("/p/a/t/x");
    expect(resolveUrl("/p/a/t/h", "..")).toBe("/p/a/");
    expect(resolveUrl("/p/a/t/h", "../x")).toBe("/p/a/x");
    expect(resolveUrl("/p/a/t/h", "../../..")).toBe("/");
    expect(resolveUrl("/p/a/t/h", "../../../x")).toBe("/x");
    expect(resolveUrl("/p/a/t/h", "../../../..")).toBe("/");
    expect(resolveUrl("/p/a/t/h", "../../../../x")).toBe("/x");
    expect(resolveUrl("/p/a/t/h", "../../../../..")).toBe("/");
  });

  it("should support resolving against relative URLs without a leading slash", () => {
    expect(resolveUrl("", "")).toBe(".");
    expect(resolveUrl("", ".")).toBe(".");
    expect(resolveUrl("", "/")).toBe("/");
    expect(resolveUrl("", "/x/y")).toBe("/x/y");
    expect(resolveUrl("p/a/t/h", "")).toBe("p/a/t/h");
    expect(resolveUrl("p/a/t/h", "/x/y")).toBe("/x/y");
    expect(resolveUrl("p/a/t/h", "x")).toBe("p/a/t/x");
    expect(resolveUrl("p/a/t/h/", "x")).toBe("p/a/t/h/x");
    expect(resolveUrl("p/a/t/h", "x/")).toBe("p/a/t/x/");
    expect(resolveUrl("p/a/t/h", "x/y")).toBe("p/a/t/x/y");
    expect(resolveUrl("p/a/t/h", "x?y#z")).toBe("p/a/t/x?y#z");
    expect(resolveUrl("p/a/t/h", ".")).toBe("p/a/t/");
    expect(resolveUrl("p/a/t/h", "./x")).toBe("p/a/t/x");
    expect(resolveUrl("p/a/t/h", "..")).toBe("p/a/");
    expect(resolveUrl("p/a/t/h", "../x")).toBe("p/a/x");
    expect(resolveUrl("p/a/t/h", "../../..")).toBe(".");
    expect(resolveUrl("p/a/t/h", "../../../x")).toBe("x");
    expect(resolveUrl("p/a/t/h", "../../../..")).toBe("..");
    expect(resolveUrl("p/a/t/h", "../../../../x")).toBe("../x");
    expect(resolveUrl("p/a/t/h", "../../../../..")).toBe("../..");
  });
});
