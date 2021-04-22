export function replaceBaseUrl (base) {
  return manifest => ({
    ...manifest,
    urls: {...manifest.urls, base},
  })
}
