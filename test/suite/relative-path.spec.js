const { relativePath } = require("../../src/path.js");

describe("relativePath()", () => {
  it("should support resolving from absolute paths", () => {
    expect(relativePath("/p/a/t/h", "/p/a/t/x")).toBe("x");
    expect(relativePath("/p/a/t/h/", "/p/a/t/h/x")).toBe("x");
    expect(relativePath("/p/a/t/h", "/p/a/t/x/")).toBe("x/");
    expect(relativePath("/p/a/t/h", "/p/a/t/x/y")).toBe("x/y");
    expect(relativePath("/p/a/t/h", "/p/a/t/x?y#z")).toBe("x?y#z");
    expect(relativePath("/p/a/t/h", "/p/a/t/")).toBe(".");
    expect(relativePath("/p/a/t/h", "/p/a/")).toBe("..");
    expect(relativePath("/p/a/t/h", "/p/a/x")).toBe("../x");
    expect(relativePath("/p/a/t/h", "/")).toBe("../../..");
    expect(relativePath("/p/a", "/")).toBe("..");
    expect(relativePath("/p/a/t/h", "/x")).toBe("../../../x");
  });

  it("should support resolving from absolute paths to already relative URLs", () => {
    expect(relativePath("/p/a/t/h", "x/y")).toBe("x/y");
  });

  it("should support resolving from relative paths", () => {
    expect(relativePath("p/a/t/h", "p/a/t/x")).toBe("x");
    expect(relativePath("p/a/t/h/", "p/a/t/h/x")).toBe("x");
    expect(relativePath("p/a/t/h", "p/a/t/x/")).toBe("x/");
    expect(relativePath("p/a/t/h", "p/a/t/x/y")).toBe("x/y");
    expect(relativePath("p/a/t/h", "p/a/t/x?y#z")).toBe("x?y#z");
    expect(relativePath("p/a/t/h", "p/a/t/")).toBe(".");
    expect(relativePath("p/a/t/h", "p/a/")).toBe("..");
    expect(relativePath("p/a/t/h", "p/a/x")).toBe("../x");
    expect(relativePath("p/a/t/h", "")).toBe("../../..");
    expect(relativePath("p/a/t/h", "x")).toBe("../../../x");
    expect(relativePath("p/a/t/h", "/x/y")).toBe("/x/y");
  });
});
