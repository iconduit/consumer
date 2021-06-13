const {readFileSync} = require('fs')
const {resolve} = require('path')
const {cwd} = require('process')

const {createConsumer} = require('./consumer.js')
const {resolvePath} = require('./path.js')

module.exports = {
  readConsumer,
}

function readConsumer (manifestPath) {
  const absoluteManifestPath = resolve(cwd(), manifestPath)
  const manifest = readManifest(absoluteManifestPath)
  const outputPath = resolvePath(absoluteManifestPath, manifest.outputPath)

  return createConsumer(manifest, {outputPath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
