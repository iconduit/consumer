const { join, relative, resolve } = require("path");
const { cwd } = require("process");

const { readConsumer } = require("../../../src/reader.js");

const fixtureDirPath = resolve(__dirname, "../../fixture");

describe("readConsumer()", () => {
  describe("when the manifest is located directly in the output directory", () => {
    const fixturePath = relative(
      cwd(),
      join(fixtureDirPath, "flat.iconduitmanifest"),
    );
    let consumer;

    beforeEach(() => {
      consumer = readConsumer(fixturePath);
    });

    it("should produce the correct absolute path for document outputs", () => {
      expect(consumer.absoluteDocumentPath("documentA")).toBe(
        join(fixtureDirPath, "document-a.html"),
      );
    });

    it("should produce the correct relative path for document outputs", () => {
      expect(consumer.documentPath("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute URL for document outputs", () => {
      expect(consumer.absoluteDocumentUrl("documentA")).toBe(
        "https://iconduit.github.io/document-a.html",
      );
    });

    it("should produce the correct relative URL for document outputs", () => {
      expect(consumer.documentUrl("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute path for image outputs", () => {
      expect(consumer.absoluteImagePath("imageA", "sizeA")).toBe(
        join(fixtureDirPath, "image-a_size-a.png"),
      );
    });

    it("should produce the correct relative path for image outputs", () => {
      expect(consumer.imagePath("imageA", "sizeA")).toBe("image-a_size-a.png");
    });

    it("should produce the correct absolute URL for image outputs", () => {
      expect(consumer.absoluteImageUrl("imageA", "sizeA")).toBe(
        "https://iconduit.github.io/image-a_size-a.png",
      );
    });

    it("should produce the correct relative URL for image outputs", () => {
      expect(consumer.imageUrl("imageA", "sizeA")).toBe("image-a_size-a.png");
    });
  });

  describe("when the manifest is located in a sub-directory of the output directory", () => {
    const fixturePath = relative(
      cwd(),
      join(fixtureDirPath, "subdir/subdir.iconduitmanifest"),
    );
    let consumer;

    beforeEach(() => {
      consumer = readConsumer(fixturePath);
    });

    it("should produce the correct absolute path for document outputs", () => {
      expect(consumer.absoluteDocumentPath("documentA")).toBe(
        join(fixtureDirPath, "document-a.html"),
      );
    });

    it("should produce the correct relative path for document outputs", () => {
      expect(consumer.documentPath("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute URL for document outputs", () => {
      expect(consumer.absoluteDocumentUrl("documentA")).toBe(
        "https://iconduit.github.io/document-a.html",
      );
    });

    it("should produce the correct relative URL for document outputs", () => {
      expect(consumer.documentUrl("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute path for image outputs", () => {
      expect(consumer.absoluteImagePath("imageA", "sizeA")).toBe(
        join(fixtureDirPath, "image-a_size-a.png"),
      );
    });

    it("should produce the correct relative path for image outputs", () => {
      expect(consumer.imagePath("imageA", "sizeA")).toBe("image-a_size-a.png");
    });

    it("should produce the correct absolute URL for image outputs", () => {
      expect(consumer.absoluteImageUrl("imageA", "sizeA")).toBe(
        "https://iconduit.github.io/image-a_size-a.png",
      );
    });

    it("should produce the correct relative URL for image outputs", () => {
      expect(consumer.imageUrl("imageA", "sizeA")).toBe("image-a_size-a.png");
    });
  });

  describe("when the manifest is located ouside the output directory", () => {
    const fixturePath = relative(
      cwd(),
      join(fixtureDirPath, "outside.iconduitmanifest"),
    );
    let consumer;

    beforeEach(() => {
      consumer = readConsumer(fixturePath);
    });

    it("should produce the correct absolute path for document outputs", () => {
      expect(consumer.absoluteDocumentPath("documentA")).toBe(
        join(fixtureDirPath, "subdir/document-a.html"),
      );
    });

    it("should produce the correct relative path for document outputs", () => {
      expect(consumer.documentPath("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute URL for document outputs", () => {
      expect(consumer.absoluteDocumentUrl("documentA")).toBe(
        "https://iconduit.github.io/document-a.html",
      );
    });

    it("should produce the correct relative URL for document outputs", () => {
      expect(consumer.documentUrl("documentA")).toBe("document-a.html");
    });

    it("should produce the correct absolute path for image outputs", () => {
      expect(consumer.absoluteImagePath("imageA", "sizeA")).toBe(
        join(fixtureDirPath, "subdir/image-a_size-a.png"),
      );
    });

    it("should produce the correct relative path for image outputs", () => {
      expect(consumer.imagePath("imageA", "sizeA")).toBe("image-a_size-a.png");
    });

    it("should produce the correct absolute URL for image outputs", () => {
      expect(consumer.absoluteImageUrl("imageA", "sizeA")).toBe(
        "https://iconduit.github.io/image-a_size-a.png",
      );
    });

    it("should produce the correct relative URL for image outputs", () => {
      expect(consumer.imageUrl("imageA", "sizeA")).toBe("image-a_size-a.png");
    });
  });
});
