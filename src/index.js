const transform = require("./transform.js");
const { createConsumer } = require("./consumer.js");
const {
  createTagDefinitionRenderer,
  createTagDefinitionResolver,
  renderTag,
} = require("./tag.js");
const {
  isAbsolutePath,
  relativePath,
  resolvePath,
  toDirPath,
} = require("./path.js");
const {
  isAbsoluteUrl,
  relativeUrl,
  resolveUrl,
  toDirUrl,
} = require("./url.js");
const { readConsumer } = require("./reader.js");

module.exports = {
  createConsumer,
  createTagDefinitionRenderer,
  createTagDefinitionResolver,
  isAbsolutePath,
  isAbsoluteUrl,
  readConsumer,
  relativePath,
  relativeUrl,
  renderTag,
  resolvePath,
  resolveUrl,
  toDirPath,
  toDirUrl,
  transform,
};
