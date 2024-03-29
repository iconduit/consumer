const { resolvePath } = require("../../src/path.js");

describe("resolvePath()", () => {
  it("should support resolving against absolute paths", () => {
    expect(resolvePath("/", "")).toBe("/");
    expect(resolvePath("/", ".")).toBe("/");
    expect(resolvePath("/", "/")).toBe("/");
    expect(resolvePath("/", "/x/y")).toBe("/x/y");
    expect(resolvePath("/p/a/t/h", "")).toBe("/p/a/t/h");
    expect(resolvePath("/p/a/t/h", "/x/y")).toBe("/x/y");
    expect(resolvePath("/p/a/t/h", "x")).toBe("/p/a/t/x");
    expect(resolvePath("/p/a/t/h/", "x")).toBe("/p/a/t/h/x");
    expect(resolvePath("/p/a/t/h", "x/")).toBe("/p/a/t/x/");
    expect(resolvePath("/p/a/t/h", "x/y")).toBe("/p/a/t/x/y");
    expect(resolvePath("/p/a/t/h", "x?y#z")).toBe("/p/a/t/x?y#z");
    expect(resolvePath("/p/a/t/h", ".")).toBe("/p/a/t/");
    expect(resolvePath("/p/a/t/h", "./x")).toBe("/p/a/t/x");
    expect(resolvePath("/p/a/t/h", "..")).toBe("/p/a/");
    expect(resolvePath("/p/a/t/h", "../x")).toBe("/p/a/x");
    expect(resolvePath("/p/a/t/h", "../../..")).toBe("/");
    expect(resolvePath("/p/a/t/h", "../../../x")).toBe("/x");
    expect(resolvePath("/p/a/t/h", "../../../..")).toBe("/");
    expect(resolvePath("/p/a/t/h", "../../../../x")).toBe("/x");
    expect(resolvePath("/p/a/t/h", "../../../../..")).toBe("/");
  });

  it("should support resolving against relative paths", () => {
    expect(resolvePath("", "")).toBe(".");
    expect(resolvePath("", ".")).toBe(".");
    expect(resolvePath("", "/")).toBe("/");
    expect(resolvePath("", "/x/y")).toBe("/x/y");
    expect(resolvePath("p/a/t/h", "")).toBe("p/a/t/h");
    expect(resolvePath("p/a/t/h", "/x/y")).toBe("/x/y");
    expect(resolvePath("p/a/t/h", "x")).toBe("p/a/t/x");
    expect(resolvePath("p/a/t/h/", "x")).toBe("p/a/t/h/x");
    expect(resolvePath("p/a/t/h", "x/")).toBe("p/a/t/x/");
    expect(resolvePath("p/a/t/h", "x/y")).toBe("p/a/t/x/y");
    expect(resolvePath("p/a/t/h", "x?y#z")).toBe("p/a/t/x?y#z");
    expect(resolvePath("p/a/t/h", ".")).toBe("p/a/t/");
    expect(resolvePath("p/a/t/h", "./x")).toBe("p/a/t/x");
    expect(resolvePath("p/a/t/h", "..")).toBe("p/a/");
    expect(resolvePath("p/a/t/h", "../x")).toBe("p/a/x");
    expect(resolvePath("p/a/t/h", "../../..")).toBe(".");
    expect(resolvePath("p/a/t/h", "../../../x")).toBe("x");
    expect(resolvePath("p/a/t/h", "../../../..")).toBe("..");
    expect(resolvePath("p/a/t/h", "../../../../x")).toBe("../x");
    expect(resolvePath("p/a/t/h", "../../../../..")).toBe("../..");
  });
});
