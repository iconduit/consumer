const {dirname, resolve} = require('path')
const {readFileSync} = require('fs')

const {createConsumer} = require('./consumer.js')

module.exports = {
  readConsumer,
}

function readConsumer (manifestPath) {
  const manifest = readManifest(manifestPath)
  const outputPath = resolve(dirname(manifestPath), manifest.outputPath)

  return createConsumer(manifest, {outputPath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
