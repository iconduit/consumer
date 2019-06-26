const transform = require('./transform.js')
const {createConsumer} = require('./consumer.js')
const {createTagListRenderer} = require('./template.js')
const {isAbsolutePath, relativePath, resolvePath} = require('./path.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')
const {readConsumer} = require('./reader.js')

module.exports = {
  createConsumer,
  createTagListRenderer,
  isAbsolutePath,
  isAbsoluteUrl,
  readConsumer,
  relativePath,
  relativeUrl,
  resolvePath,
  resolveUrl,
  transform,
}
