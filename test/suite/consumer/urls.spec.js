import {createConsumer} from '../../../src/consumer.js'

describe('Consumer URL methods', () => {
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

  describe('with absolute base URL and output URL of .', () => {
    let consumer

    beforeEach(() => {
      manifest.urls.base = 'https://iconduit.github.io/p/a/t/h'
      manifest.urls.output = '.'

      consumer = createConsumer(manifest)
    })

    it('should be able to resolve absolute URLs', () => {
      expect(consumer.absoluteUrl('.')).toBe('https://iconduit.github.io/p/a/t/')
      expect(consumer.absoluteUrl('..')).toBe('https://iconduit.github.io/p/a/')
      expect(consumer.absoluteUrl('../x')).toBe('https://iconduit.github.io/p/a/x')
      expect(consumer.absoluteUrl('x/y')).toBe('https://iconduit.github.io/p/a/t/x/y')
      expect(consumer.absoluteUrl('x/y/')).toBe('https://iconduit.github.io/p/a/t/x/y/')
      expect(consumer.absoluteUrl('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', () => {
      expect(consumer.url('x/y')).toBe('x/y')
      expect(consumer.url('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve absolute image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.absoluteImageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'relative')).toBe('https://iconduit.github.io/p/a/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.imageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.imageUrl('imageA', 'relative')).toBe('../x/y.png')
      expect(consumer.imageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve absolute document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.absoluteDocumentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.absoluteDocumentUrl('relative')).toBe('https://iconduit.github.io/p/a/x/y.html')
      expect(consumer.absoluteDocumentUrl('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.documentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.documentUrl('relative')).toBe('../x/y.html')
      expect(consumer.documentUrl('nonexistent')).toBeNull()
    })
  })

  describe('with absolute base URL and output URL with path components', () => {
    let consumer

    beforeEach(() => {
      manifest.urls.base = 'https://iconduit.github.io/p/a/t/h'
      manifest.urls.output = 'o/u/t'

      consumer = createConsumer(manifest)
    })

    it('should be able to resolve absolute URLs', () => {
      expect(consumer.absoluteUrl('.')).toBe('https://iconduit.github.io/p/a/t/')
      expect(consumer.absoluteUrl('..')).toBe('https://iconduit.github.io/p/a/')
      expect(consumer.absoluteUrl('../x')).toBe('https://iconduit.github.io/p/a/x')
      expect(consumer.absoluteUrl('x/y')).toBe('https://iconduit.github.io/p/a/t/x/y')
      expect(consumer.absoluteUrl('x/y/')).toBe('https://iconduit.github.io/p/a/t/x/y/')
      expect(consumer.absoluteUrl('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', () => {
      expect(consumer.url('x/y')).toBe('../../x/y')
      expect(consumer.url('o/u/x/y')).toBe('x/y')
      expect(consumer.url('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve absolute image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.absoluteImageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'relative')).toBe('https://iconduit.github.io/p/a/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: 'x/y.png'},
        relativeToOutput: {url: 'o/u/x/y.png'},
      }

      expect(consumer.imageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.imageUrl('imageA', 'relative')).toBe('../../x/y.png')
      expect(consumer.imageUrl('imageA', 'relativeToOutput')).toBe('x/y.png')
      expect(consumer.imageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve absolute document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.absoluteDocumentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.absoluteDocumentUrl('relative')).toBe('https://iconduit.github.io/p/a/x/y.html')
      expect(consumer.absoluteDocumentUrl('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: 'x/y.html'}
      manifest.output.document.relativeToOutput = {url: 'o/u/x/y.html'}

      expect(consumer.documentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.documentUrl('relative')).toBe('../../x/y.html')
      expect(consumer.documentUrl('relativeToOutput')).toBe('x/y.html')
      expect(consumer.documentUrl('nonexistent')).toBeNull()
    })
  })

  describe('with no base URL and output URL of .', () => {
    let consumer

    beforeEach(() => {
      manifest.urls.output = '.'

      consumer = createConsumer(manifest)
    })

    it('should not be able to resolve absolute URLs unless they are already absolute', () => {
      expect(consumer.absoluteUrl('.')).toBeNull()
      expect(consumer.absoluteUrl('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', () => {
      expect(consumer.url('x/y')).toBe('x/y')
      expect(consumer.url('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should not be able to resolve absolute image URLs unless they are already absolute', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.absoluteImageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'relative')).toBeNull()
      expect(consumer.absoluteImageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.imageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.imageUrl('imageA', 'relative')).toBe('../x/y.png')
      expect(consumer.imageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should not be able to resolve absolute document URLs unless they are already absolute', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.absoluteDocumentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.absoluteDocumentUrl('relative')).toBeNull()
      expect(consumer.absoluteDocumentUrl('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.documentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.documentUrl('relative')).toBe('../x/y.html')
      expect(consumer.documentUrl('nonexistent')).toBeNull()
    })
  })

  describe('with no base URL and output URL with path components', () => {
    let consumer

    beforeEach(() => {
      manifest.urls.output = 'o/u/t'

      consumer = createConsumer(manifest)
    })

    it('should not be able to resolve absolute URLs unless they are already absolute', () => {
      expect(consumer.absoluteUrl('.')).toBeNull()
      expect(consumer.absoluteUrl('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should be able to resolve relative URLs', () => {
      expect(consumer.url('x/y')).toBe('../../x/y')
      expect(consumer.url('o/u/x/y')).toBe('x/y')
      expect(consumer.url('https://example.org/x/y')).toBe('https://example.org/x/y')
    })

    it('should not be able to resolve absolute image URLs unless they are already absolute', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: '../x/y.png'},
      }

      expect(consumer.absoluteImageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.absoluteImageUrl('imageA', 'relative')).toBeNull()
      expect(consumer.absoluteImageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.absoluteImageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should be able to resolve relative image URLs', () => {
      manifest.output.image.imageA = {
        absolute: {url: 'https://example.org/x/y.png'},
        relative: {url: 'x/y.png'},
        relativeToOutput: {url: 'o/u/x/y.png'},
      }

      expect(consumer.imageUrl('imageA', 'absolute')).toBe('https://example.org/x/y.png')
      expect(consumer.imageUrl('imageA', 'relative')).toBe('../../x/y.png')
      expect(consumer.imageUrl('imageA', 'relativeToOutput')).toBe('x/y.png')
      expect(consumer.imageUrl('imageA', 'nonexistent')).toBeNull()
      expect(consumer.imageUrl('nonexistent', 'nonexistent')).toBeNull()
    })

    it('should not be able to resolve absolute document URLs unless they are already absolute', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: '../x/y.html'}

      expect(consumer.absoluteDocumentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.absoluteDocumentUrl('relative')).toBeNull()
      expect(consumer.absoluteDocumentUrl('nonexistent')).toBeNull()
    })

    it('should be able to resolve relative document URLs', () => {
      manifest.output.document.absolute = {url: 'https://example.org/x/y.html'}
      manifest.output.document.relative = {url: 'x/y.html'}
      manifest.output.document.relativeToOutput = {url: 'o/u/x/y.html'}

      expect(consumer.documentUrl('absolute')).toBe('https://example.org/x/y.html')
      expect(consumer.documentUrl('relative')).toBe('../../x/y.html')
      expect(consumer.documentUrl('relativeToOutput')).toBe('x/y.html')
      expect(consumer.documentUrl('nonexistent')).toBeNull()
    })
  })
})
