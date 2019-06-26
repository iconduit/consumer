const {expect} = require('chai')
const {join, resolve} = require('path')

const {readConsumer} = require('../../../src/reader.js')

const fixtureDirPath = resolve(__dirname, '../../fixture')

describe('readConsumer()', function () {
  context('when the manifest is located directly in the output directory', function () {
    const fixturePath = join(fixtureDirPath, 'iconduit.flat.manifest.json')

    beforeEach(function () {
      this.consumer = readConsumer(fixturePath)
    })

    it('should produce the correct absolute path for document outputs', function () {
      expect(this.consumer.absoluteDocumentPath('documentA')).to.equal(join(fixtureDirPath, 'document-a.html'))
    })

    it('should produce the correct relative path for document outputs', function () {
      expect(this.consumer.documentPath('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute URL for document outputs', function () {
      expect(this.consumer.absoluteDocumentUrl('documentA')).to.equal('https://iconduit.github.io/document-a.html')
    })

    it('should produce the correct relative URL for document outputs', function () {
      expect(this.consumer.documentUrl('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute path for image outputs', function () {
      expect(this.consumer.absoluteImagePath('imageA', 'sizeA')).to.equal(join(fixtureDirPath, 'image-a_size-a.png'))
    })

    it('should produce the correct relative path for image outputs', function () {
      expect(this.consumer.imagePath('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })

    it('should produce the correct absolute URL for image outputs', function () {
      expect(this.consumer.absoluteImageUrl('imageA', 'sizeA')).to.equal('https://iconduit.github.io/image-a_size-a.png')
    })

    it('should produce the correct relative URL for image outputs', function () {
      expect(this.consumer.imageUrl('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })
  })

  context('when the manifest is located in a sub-directory of the output directory', function () {
    const fixturePath = join(fixtureDirPath, 'subdir/iconduit.subdir.manifest.json')

    beforeEach(function () {
      this.consumer = readConsumer(fixturePath)
    })

    it('should produce the correct absolute path for document outputs', function () {
      expect(this.consumer.absoluteDocumentPath('documentA')).to.equal(join(fixtureDirPath, 'document-a.html'))
    })

    it('should produce the correct relative path for document outputs', function () {
      expect(this.consumer.documentPath('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute URL for document outputs', function () {
      expect(this.consumer.absoluteDocumentUrl('documentA')).to.equal('https://iconduit.github.io/document-a.html')
    })

    it('should produce the correct relative URL for document outputs', function () {
      expect(this.consumer.documentUrl('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute path for image outputs', function () {
      expect(this.consumer.absoluteImagePath('imageA', 'sizeA')).to.equal(join(fixtureDirPath, 'image-a_size-a.png'))
    })

    it('should produce the correct relative path for image outputs', function () {
      expect(this.consumer.imagePath('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })

    it('should produce the correct absolute URL for image outputs', function () {
      expect(this.consumer.absoluteImageUrl('imageA', 'sizeA')).to.equal('https://iconduit.github.io/image-a_size-a.png')
    })

    it('should produce the correct relative URL for image outputs', function () {
      expect(this.consumer.imageUrl('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })
  })

  context('when the manifest is located ouside the output directory', function () {
    const fixturePath = join(fixtureDirPath, 'iconduit.outside.manifest.json')

    beforeEach(function () {
      this.consumer = readConsumer(fixturePath)
    })

    it('should produce the correct absolute path for document outputs', function () {
      expect(this.consumer.absoluteDocumentPath('documentA')).to.equal(join(fixtureDirPath, 'subdir/document-a.html'))
    })

    it('should produce the correct relative path for document outputs', function () {
      expect(this.consumer.documentPath('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute URL for document outputs', function () {
      expect(this.consumer.absoluteDocumentUrl('documentA')).to.equal('https://iconduit.github.io/document-a.html')
    })

    it('should produce the correct relative URL for document outputs', function () {
      expect(this.consumer.documentUrl('documentA')).to.equal('document-a.html')
    })

    it('should produce the correct absolute path for image outputs', function () {
      expect(this.consumer.absoluteImagePath('imageA', 'sizeA')).to.equal(join(fixtureDirPath, 'subdir/image-a_size-a.png'))
    })

    it('should produce the correct relative path for image outputs', function () {
      expect(this.consumer.imagePath('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })

    it('should produce the correct absolute URL for image outputs', function () {
      expect(this.consumer.absoluteImageUrl('imageA', 'sizeA')).to.equal('https://iconduit.github.io/image-a_size-a.png')
    })

    it('should produce the correct relative URL for image outputs', function () {
      expect(this.consumer.imageUrl('imageA', 'sizeA')).to.equal('image-a_size-a.png')
    })
  })
})
