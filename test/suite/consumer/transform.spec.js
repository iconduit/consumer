const {createConsumer} = require('../../../src/consumer.js')
const {replaceBaseUrl} = require('../../../src/transform.js')

describe('consumer.transform()', () => {
  let baseConsumer

  beforeEach(() => {
    const manifest = {
      output: {
        document: {
          documentA: {
            url: 'document-a.html',
          },
        },
        image: {},
      },
      urls: {
        base: '.',
        output: '.',
      },
    }

    baseConsumer = createConsumer(manifest)
  })

  it('should allow replacement of the base URL', () => {
    const consumer = baseConsumer.transform(replaceBaseUrl('https://iconduit.github.io/'))

    expect(consumer.absoluteDocumentUrl('documentA')).toBe('https://iconduit.github.io/document-a.html')
  })
})
