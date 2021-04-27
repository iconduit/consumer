const {readFileSync} = require('fs')

const {createConsumer} = require('./consumer.js')
const {resolvePath} = require('./path.js')

module.exports = {
  readConsumer,
}

function readConsumer (manifestPath) {
  const manifest = readManifest(manifestPath)
  const outputPath = resolvePath(manifestPath, manifest.outputPath)

  return createConsumer(manifest, {outputPath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
