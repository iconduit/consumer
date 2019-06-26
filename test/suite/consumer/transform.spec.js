const {expect} = require('chai')

const {createConsumer} = require('../../../src/consumer.js')
const {replaceBaseUrl} = require('../../../src/transform.js')

describe('consumer.transform()', function () {
  beforeEach(function () {
    this.manifest = {
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

    this.consumer = createConsumer(this.manifest)
  })

  it('should allow replacement of the base URL', function () {
    const consumer = this.consumer.transform(replaceBaseUrl('https://iconduit.github.io/'))

    expect(consumer.absoluteDocumentUrl('documentA')).to.equal('https://iconduit.github.io/document-a.html')
  })
})
