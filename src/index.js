const {createConsumer} = require('./consumer.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')
const {readConsumer} = require('./reader.js')

module.exports = {
  createConsumer,
  isAbsoluteUrl,
  readConsumer,
  relativeUrl,
  resolveUrl,
}
