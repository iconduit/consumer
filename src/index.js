const {createConsumer} = require('./consumer.js')
const {isAbsolutePath, relativePath, resolvePath} = require('./path.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')
const {readConsumer} = require('./reader.js')

module.exports = {
  createConsumer,
  isAbsolutePath,
  isAbsoluteUrl,
  readConsumer,
  relativePath,
  relativeUrl,
  resolvePath,
  resolveUrl,
}
