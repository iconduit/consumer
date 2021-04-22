import {readFileSync} from 'fs'

import {createConsumer} from './consumer.js'
import {resolvePath} from './path.js'

export function readConsumer (manifestPath) {
  const manifest = readManifest(manifestPath)
  const outputPath = resolvePath(manifestPath, manifest.outputPath)

  return createConsumer(manifest, {outputPath})
}

function readManifest (manifestPath) {
  return JSON.parse(readFileSync(manifestPath))
}
