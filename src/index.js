const transform = require('./transform.js')
const {createConsumer} = require('./consumer.js')
const {createTagListRenderer} = require('./tag.js')
const {isAbsolutePath, relativePath, resolvePath, toDirPath} = require('./path.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl, toDirUrl} = require('./url.js')
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
  toDirPath,
  toDirUrl,
  transform,
}
