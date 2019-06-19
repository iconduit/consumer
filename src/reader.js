const {dirname, resolve} = require('path')
const {readFileSync} = require('fs')

const {createConsumer} = require('./consumer.js')

module.exports = {
  readConsumer,
}

function readConsumer (manifestPath) {
  const manifest = readManifest(manifestPath)
  const basePath = resolve(dirname(manifestPath), manifest.outputPath)

  return createConsumer(manifest, {basePath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
