const {dirname, join, normalize, sep} = require('path')
const {readFileSync} = require('fs')

const {createConsumer} = require('./consumer.js')

module.exports = {
  readConsumer,
}

function readConsumer (manifestPath) {
  const manifest = readManifest(manifestPath)
  const outputPath = normalize(join(dirname(manifestPath), manifest.outputPath) + sep)

  return createConsumer(manifest, {outputPath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
