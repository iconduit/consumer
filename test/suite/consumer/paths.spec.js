const {expect} = require('chai')

const {createConsumer} = require('../../../src/consumer.js')

describe('Consumer path methods', function () {
  beforeEach(function () {
    this.manifest = {
      output: {
        document: {},
        image: {},
      },
      urls: {},
    }
  })

  context('with absolute output path and base path of .', function () {
    beforeEach(function () {
      this.manifest.outputPath = '/p/a/t/h'

      this.consumer = createConsumer(this.manifest)
    })

    it('should be able to resolve absolute paths', function () {
      expect(this.consumer.absolutePath('.')).to.equal('/p/a/t/')
      expect(this.consumer.absolutePath('..')).to.equal('/p/a/')
      expect(this.consumer.absolutePath('../x')).to.equal('/p/a/x')
      expect(this.consumer.absolutePath('x/y')).to.equal('/p/a/t/x/y')
      expect(this.consumer.absolutePath('x/y/')).to.equal('/p/a/t/x/y/')
      expect(this.consumer.absolutePath('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve relative paths', function () {
      expect(this.consumer.path('x/y')).to.equal('x/y')
      expect(this.consumer.path('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve absolute image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.absoluteImagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'relative')).to.equal('/p/a/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.imagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.imagePath('imageA', 'relative')).to.equal('../x/y.png')
      expect(this.consumer.imagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve absolute document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.absoluteDocumentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.absoluteDocumentPath('relative')).to.equal('/p/a/x/y.html')
      expect(this.consumer.absoluteDocumentPath('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.documentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.documentPath('relative')).to.equal('../x/y.html')
      expect(this.consumer.documentPath('nonexistent')).to.be.null()
    })
  })

  context('with absolute output path and base path with components', function () {
    beforeEach(function () {
      this.manifest.outputPath = '/p/a/t/h'

      this.consumer = createConsumer(this.manifest, {basePath: 'o/u/t'})
    })

    it('should be able to resolve absolute paths', function () {
      expect(this.consumer.absolutePath('.')).to.equal('/p/a/t/')
      expect(this.consumer.absolutePath('..')).to.equal('/p/a/')
      expect(this.consumer.absolutePath('../x')).to.equal('/p/a/x')
      expect(this.consumer.absolutePath('x/y')).to.equal('/p/a/t/x/y')
      expect(this.consumer.absolutePath('x/y/')).to.equal('/p/a/t/x/y/')
      expect(this.consumer.absolutePath('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve relative paths', function () {
      expect(this.consumer.path('x/y')).to.equal('../../x/y')
      expect(this.consumer.path('o/u/x/y')).to.equal('x/y')
      expect(this.consumer.path('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve absolute image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.absoluteImagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'relative')).to.equal('/p/a/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: 'x/y.png'},
        relativeToBase: {path: 'o/u/x/y.png'},
      }

      expect(this.consumer.imagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.imagePath('imageA', 'relative')).to.equal('../../x/y.png')
      expect(this.consumer.imagePath('imageA', 'relativeToBase')).to.equal('x/y.png')
      expect(this.consumer.imagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve absolute document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.absoluteDocumentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.absoluteDocumentPath('relative')).to.equal('/p/a/x/y.html')
      expect(this.consumer.absoluteDocumentPath('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: 'x/y.html'}
      this.manifest.output.document.relativeToOutput = {path: 'o/u/x/y.html'}

      expect(this.consumer.documentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.documentPath('relative')).to.equal('../../x/y.html')
      expect(this.consumer.documentPath('relativeToOutput')).to.equal('x/y.html')
      expect(this.consumer.documentPath('nonexistent')).to.be.null()
    })
  })

  context('with no output path and a base path of .', function () {
    beforeEach(function () {
      this.consumer = createConsumer(this.manifest)
    })

    it('should not be able to resolve absolute paths unless they are already absolute', function () {
      expect(this.consumer.absolutePath('.')).to.be.null()
      expect(this.consumer.absolutePath('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve relative paths', function () {
      expect(this.consumer.path('x/y')).to.equal('x/y')
      expect(this.consumer.path('/x/y')).to.equal('/x/y')
    })

    it('should not be able to resolve absolute image paths unless they are already absolute', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.absoluteImagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'relative')).to.be.null()
      expect(this.consumer.absoluteImagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.imagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.imagePath('imageA', 'relative')).to.equal('../x/y.png')
      expect(this.consumer.imagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should not be able to resolve absolute document paths unless they are already absolute', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.absoluteDocumentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.absoluteDocumentPath('relative')).to.be.null()
      expect(this.consumer.absoluteDocumentPath('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.documentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.documentPath('relative')).to.equal('../x/y.html')
      expect(this.consumer.documentPath('nonexistent')).to.be.null()
    })
  })

  context('with no output path and base path with components', function () {
    beforeEach(function () {
      this.consumer = createConsumer(this.manifest, {basePath: 'o/u/t'})
    })

    it('should not be able to resolve absolute paths unless they are already absolute', function () {
      expect(this.consumer.absolutePath('.')).to.be.null()
      expect(this.consumer.absolutePath('/x/y')).to.equal('/x/y')
    })

    it('should be able to resolve relative paths', function () {
      expect(this.consumer.path('x/y')).to.equal('../../x/y')
      expect(this.consumer.path('o/u/x/y')).to.equal('x/y')
      expect(this.consumer.path('/x/y')).to.equal('/x/y')
    })

    it('should not be able to resolve absolute image paths unless they are already absolute', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(this.consumer.absoluteImagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.absoluteImagePath('imageA', 'relative')).to.be.null()
      expect(this.consumer.absoluteImagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.absoluteImagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should be able to resolve relative image paths', function () {
      this.manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: 'x/y.png'},
        relativeToOutput: {path: 'o/u/x/y.png'},
      }

      expect(this.consumer.imagePath('imageA', 'absolute')).to.equal('/x/y.png')
      expect(this.consumer.imagePath('imageA', 'relative')).to.equal('../../x/y.png')
      expect(this.consumer.imagePath('imageA', 'relativeToOutput')).to.equal('x/y.png')
      expect(this.consumer.imagePath('imageA', 'nonexistent')).to.be.null()
      expect(this.consumer.imagePath('nonexistent', 'nonexistent')).to.be.null()
    })

    it('should not be able to resolve absolute document paths unless they are already absolute', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: '../x/y.html'}

      expect(this.consumer.absoluteDocumentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.absoluteDocumentPath('relative')).to.be.null()
      expect(this.consumer.absoluteDocumentPath('nonexistent')).to.be.null()
    })

    it('should be able to resolve relative document paths', function () {
      this.manifest.output.document.absolute = {path: '/x/y.html'}
      this.manifest.output.document.relative = {path: 'x/y.html'}
      this.manifest.output.document.relativeToOutput = {path: 'o/u/x/y.html'}

      expect(this.consumer.documentPath('absolute')).to.equal('/x/y.html')
      expect(this.consumer.documentPath('relative')).to.equal('../../x/y.html')
      expect(this.consumer.documentPath('relativeToOutput')).to.equal('x/y.html')
      expect(this.consumer.documentPath('nonexistent')).to.be.null()
    })
  })
})
