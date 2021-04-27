const {createConsumer} = require('../../../src/consumer.js')

describe('Consumer path methods', () => {
  let manifest

  beforeEach(() => {
    manifest = {
      output: {
        document: {},
        image: {},
      },
      urls: {},
    }
  })

  describe('with absolute output path and base path of .', () => {
    let consumer

    beforeEach(() => {
      manifest.outputPath = '/p/a/t/h'

      consumer = createConsumer(manifest)
    })

    it('should be able to resolve absolute paths', () => {
      expect(consumer.absolutePath('.')).toBe('/p/a/t/')
      expect(consumer.absolutePath('..')).toBe('/p/a/')
      expect(consumer.absolutePath('../x')).toBe('/p/a/x')
      expect(consumer.absolutePath('x/y')).toBe('/p/a/t/x/y')
      expect(consumer.absolutePath('x/y/')).toBe('/p/a/t/x/y/')
      expect(consumer.absolutePath('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve relative paths', () => {
      expect(consumer.path('x/y')).toBe('x/y')
      expect(consumer.path('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve absolute image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.absoluteImagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'relative')).toBe('/p/a/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.imagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.imagePath('imageA', 'relative')).toBe('../x/y.png')
      expect(consumer.imagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve absolute document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.absoluteDocumentPath('absolute')).toBe('/x/y.html')
      expect(consumer.absoluteDocumentPath('relative')).toBe('/p/a/x/y.html')
      expect(consumer.absoluteDocumentPath('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.documentPath('absolute')).toBe('/x/y.html')
      expect(consumer.documentPath('relative')).toBe('../x/y.html')
      expect(consumer.documentPath('nonexistent')).toBeNull()
    })
  })

  describe('with absolute output path and base path with components', () => {
    let consumer

    beforeEach(() => {
      manifest.outputPath = '/p/a/t/h'

      consumer = createConsumer(manifest, {basePath: 'o/u/t'})
    })

    it('should be able to resolve absolute paths', () => {
      expect(consumer.absolutePath('.')).toBe('/p/a/t/')
      expect(consumer.absolutePath('..')).toBe('/p/a/')
      expect(consumer.absolutePath('../x')).toBe('/p/a/x')
      expect(consumer.absolutePath('x/y')).toBe('/p/a/t/x/y')
      expect(consumer.absolutePath('x/y/')).toBe('/p/a/t/x/y/')
      expect(consumer.absolutePath('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve relative paths', () => {
      expect(consumer.path('x/y')).toBe('../../x/y')
      expect(consumer.path('o/u/x/y')).toBe('x/y')
      expect(consumer.path('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve absolute image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.absoluteImagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'relative')).toBe('/p/a/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: 'x/y.png'},
        relativeToBase: {path: 'o/u/x/y.png'},
      }

      expect(consumer.imagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.imagePath('imageA', 'relative')).toBe('../../x/y.png')
      expect(consumer.imagePath('imageA', 'relativeToBase')).toBe('x/y.png')
      expect(consumer.imagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve absolute document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.absoluteDocumentPath('absolute')).toBe('/x/y.html')
      expect(consumer.absoluteDocumentPath('relative')).toBe('/p/a/x/y.html')
      expect(consumer.absoluteDocumentPath('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: 'x/y.html'}
      manifest.output.document.relativeToOutput = {path: 'o/u/x/y.html'}

      expect(consumer.documentPath('absolute')).toBe('/x/y.html')
      expect(consumer.documentPath('relative')).toBe('../../x/y.html')
      expect(consumer.documentPath('relativeToOutput')).toBe('x/y.html')
      expect(consumer.documentPath('nonexistent')).toBeNull()
    })
  })

  describe('with no output path and a base path of .', () => {
    let consumer

    beforeEach(() => {
      consumer = createConsumer(manifest)
    })

    it('should not be able to resolve absolute paths unless they are already absolute', () => {
      expect(consumer.absolutePath('.')).toBeNull()
      expect(consumer.absolutePath('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve relative paths', () => {
      expect(consumer.path('x/y')).toBe('x/y')
      expect(consumer.path('/x/y')).toBe('/x/y')
    })

    it('should not be able to resolve absolute image paths unless they are already absolute', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.absoluteImagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'relative')).toBeNull()
      expect(consumer.absoluteImagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.imagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.imagePath('imageA', 'relative')).toBe('../x/y.png')
      expect(consumer.imagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should not be able to resolve absolute document paths unless they are already absolute', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.absoluteDocumentPath('absolute')).toBe('/x/y.html')
      expect(consumer.absoluteDocumentPath('relative')).toBeNull()
      expect(consumer.absoluteDocumentPath('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.documentPath('absolute')).toBe('/x/y.html')
      expect(consumer.documentPath('relative')).toBe('../x/y.html')
      expect(consumer.documentPath('nonexistent')).toBeNull()
    })
  })

  describe('with no output path and base path with components', () => {
    let consumer

    beforeEach(() => {
      consumer = createConsumer(manifest, {basePath: 'o/u/t'})
    })

    it('should not be able to resolve absolute paths unless they are already absolute', () => {
      expect(consumer.absolutePath('.')).toBeNull()
      expect(consumer.absolutePath('/x/y')).toBe('/x/y')
    })

    it('should be able to resolve relative paths', () => {
      expect(consumer.path('x/y')).toBe('../../x/y')
      expect(consumer.path('o/u/x/y')).toBe('x/y')
      expect(consumer.path('/x/y')).toBe('/x/y')
    })

    it('should not be able to resolve absolute image paths unless they are already absolute', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: '../x/y.png'},
      }

      expect(consumer.absoluteImagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.absoluteImagePath('imageA', 'relative')).toBeNull()
      expect(consumer.absoluteImagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image paths', () => {
      manifest.output.image.imageA = {
        absolute: {path: '/x/y.png'},
        relative: {path: 'x/y.png'},
        relativeToOutput: {path: 'o/u/x/y.png'},
      }

      expect(consumer.imagePath('imageA', 'absolute')).toBe('/x/y.png')
      expect(consumer.imagePath('imageA', 'relative')).toBe('../../x/y.png')
      expect(consumer.imagePath('imageA', 'relativeToOutput')).toBe('x/y.png')
      expect(consumer.imagePath('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imagePath('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should not be able to resolve absolute document paths unless they are already absolute', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: '../x/y.html'}

      expect(consumer.absoluteDocumentPath('absolute')).toBe('/x/y.html')
      expect(consumer.absoluteDocumentPath('relative')).toBeNull()
      expect(consumer.absoluteDocumentPath('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document paths', () => {
      manifest.output.document.absolute = {path: '/x/y.html'}
      manifest.output.document.relative = {path: 'x/y.html'}
      manifest.output.document.relativeToOutput = {path: 'o/u/x/y.html'}

      expect(consumer.documentPath('absolute')).toBe('/x/y.html')
      expect(consumer.documentPath('relative')).toBe('../../x/y.html')
      expect(consumer.documentPath('relativeToOutput')).toBe('x/y.html')
      expect(consumer.documentPath('nonexistent')).toBeNull()
    })
  })
})
