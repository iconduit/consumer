const {expect} = require('chai')

const {createConsumer} = require('../../../src/consumer.js')

describe('Consumer URL methods', function () {
  beforeEach(function () {
    this.manifest = {
      output: {
        document: {},
        image: {},
      },
      urls: {},
    }
  })

  context('with absolute base URL and output URL of .', function () {
    beforeEach(function () {
      this.manifest.urls.base = 'https://iconduit.github.io/p/a/t/h'
      this.manifest.urls.output = '.'

      this.consumer = createConsumer(this.manifest)
    })

    it('should be able to resolve absolute URLs', function () {
      expect(this.consumer.absoluteUrl('.')).to.equal('https://iconduit.github.io/p/a/t/')
      expect(this.consumer.absoluteUrl('..')).to.equal('https://iconduit.github.io/p/a/')
      expect(this.consumer.absoluteUrl('../x')).to.equal('https://iconduit.github.io/p/a/x')
      expect(this.consumer.absoluteUrl('x/y')).to.equal('https://iconduit.github.io/p/a/t/x/y')
      expect(this.consumer.absoluteUrl('x/y/')).to.equal('https://iconduit.github.io/p/a/t/x/y/')
      expect(this.consumer.absoluteUrl('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', function () {
      expect(this.consumer.url('x/y')).to.equal('x/y')
      expect(this.consumer.url('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve absolute image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.absoluteImageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'relative')).to.equal('https://iconduit.github.io/p/a/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.imageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relative')).to.equal('../x/y.png')
      expect(this.consumer.imageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve absolute document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.absoluteDocumentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('relative')).to.equal('https://iconduit.github.io/p/a/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.documentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.documentUrl('relative')).to.equal('../x/y.html')
      expect(this.consumer.documentUrl('nonexistent')).to.be.null()
    })
  })

  context('with absolute base URL and output URL with path components', function () {
    beforeEach(function () {
      this.manifest.urls.base = 'https://iconduit.github.io/p/a/t/h'
      this.manifest.urls.output = 'o/u/t'

      this.consumer = createConsumer(this.manifest)
    })

    it('should be able to resolve absolute URLs', function () {
      expect(this.consumer.absoluteUrl('.')).to.equal('https://iconduit.github.io/p/a/t/')
      expect(this.consumer.absoluteUrl('..')).to.equal('https://iconduit.github.io/p/a/')
      expect(this.consumer.absoluteUrl('../x')).to.equal('https://iconduit.github.io/p/a/x')
      expect(this.consumer.absoluteUrl('x/y')).to.equal('https://iconduit.github.io/p/a/t/x/y')
      expect(this.consumer.absoluteUrl('x/y/')).to.equal('https://iconduit.github.io/p/a/t/x/y/')
      expect(this.consumer.absoluteUrl('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', function () {
      expect(this.consumer.url('x/y')).to.equal('../../x/y')
      expect(this.consumer.url('o/u/x/y')).to.equal('x/y')
      expect(this.consumer.url('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve absolute image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.absoluteImageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'relative')).to.equal('https://iconduit.github.io/p/a/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: 'x/y.png'},
        relativeToOutput: {url: 'o/u/x/y.png'},
      }

      expect(this.consumer.imageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relative')).to.equal('../../x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relativeToOutput')).to.equal('x/y.png')
      expect(this.consumer.imageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve absolute document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.absoluteDocumentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('relative')).to.equal('https://iconduit.github.io/p/a/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: 'x/y.html'}
      this.manifest.output.document.relativeToOutput = {url: 'o/u/x/y.html'}

      expect(this.consumer.documentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.documentUrl('relative')).to.equal('../../x/y.html')
      expect(this.consumer.documentUrl('relativeToOutput')).to.equal('x/y.html')
      expect(this.consumer.documentUrl('nonexistent')).to.be.null()
    })
  })

  context('with no base URL and output URL of .', function () {
    beforeEach(function () {
      this.manifest.urls.output = '.'

      this.consumer = createConsumer(this.manifest)
    })

    it('should not be able to resolve absolute URLs unless they are already absolute', function () {
      expect(this.consumer.absoluteUrl('.')).to.be.null()
      expect(this.consumer.absoluteUrl('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', function () {
      expect(this.consumer.url('x/y')).to.equal('x/y')
      expect(this.consumer.url('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should not be able to resolve absolute image URLs unless they are already absolute', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.absoluteImageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'relative')).to.be.null()
      expect(this.consumer.absoluteImageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.imageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relative')).to.equal('../x/y.png')
      expect(this.consumer.imageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should not be able to resolve absolute document URLs unless they are already absolute', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.absoluteDocumentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('relative')).to.be.null()
      expect(this.consumer.absoluteDocumentUrl('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.documentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.documentUrl('relative')).to.equal('../x/y.html')
      expect(this.consumer.documentUrl('nonexistent')).to.be.null()
    })
  })

  context('with no base URL and output URL with path components', function () {
    beforeEach(function () {
      this.manifest.urls.output = 'o/u/t'

      this.consumer = createConsumer(this.manifest)
    })

    it('should not be able to resolve absolute URLs unless they are already absolute', function () {
      expect(this.consumer.absoluteUrl('.')).to.be.null()
      expect(this.consumer.absoluteUrl('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', function () {
      expect(this.consumer.url('x/y')).to.equal('../../x/y')
      expect(this.consumer.url('o/u/x/y')).to.equal('x/y')
      expect(this.consumer.url('https://example.org/x/y')).to.equal('https://example.org/x/y')
    })

    it('should not be able to resolve absolute image URLs unless they are already absolute', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(this.consumer.absoluteImageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.absoluteImageUrl('imageA', 'relative')).to.be.null()
      expect(this.consumer.absoluteImageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image URLs', function () {
      this.manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: 'x/y.png'},
        relativeToOutput: {url: 'o/u/x/y.png'},
      }

      expect(this.consumer.imageUrl('imageA', 'absolute')).to.equal('https://example.org/x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relative')).to.equal('../../x/y.png')
      expect(this.consumer.imageUrl('imageA', 'relativeToOutput')).to.equal('x/y.png')
      expect(this.consumer.imageUrl('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imageUrl('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should not be able to resolve absolute document URLs unless they are already absolute', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: '../x/y.html'}

      expect(this.consumer.absoluteDocumentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.absoluteDocumentUrl('relative')).to.be.null()
      expect(this.consumer.absoluteDocumentUrl('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document URLs', function () {
      this.manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      this.manifest.output.document.relative = {url: 'x/y.html'}
      this.manifest.output.document.relativeToOutput = {url: 'o/u/x/y.html'}

      expect(this.consumer.documentUrl('absolute')).to.equal('https://example.org/x/y.html')
      expect(this.consumer.documentUrl('relative')).to.equal('../../x/y.html')
      expect(this.consumer.documentUrl('relativeToOutput')).to.equal('x/y.html')
      expect(this.consumer.documentUrl('nonexistent')).to.be.null()
    })
  })
})
