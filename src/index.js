const {createConsumer} = require('./consumer.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')

module.exports = {
  createConsumer,
  isAbsoluteUrl,
  relativeUrl,
  resolveUrl,
}
