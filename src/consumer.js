const {isAbsolutePath, relativePath, resolvePath} = require('./path.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')
const {createTagListRenderer} = require('./template.js')

module.exports = {
  createConsumer,
}

function createConsumer (manifest, options = {}) {
  const {
    output: {document, image},
    outputPath: manifestOutputPath,
    urls: {base: appBaseUrl, output: outputBaseUrl},
  } = manifest

  const {
    basePath = '.',
    baseUrl: optionsBaseUrl,
    outputPath: optionsOutputPath,
  } = options

  const baseUrl = optionsBaseUrl || outputBaseUrl
  const outputPath = optionsOutputPath || manifestOutputPath

  const consumer = {
    absolutePath (path) {
      return resolveAbsolutePath(path)
    },

    absoluteUrl (url) {
      return resolveAbsoluteUrl(url)
    },

    absoluteDocumentPath (outputName, sizeKey) {
      return resolveAbsolutePath(documentDefinition(outputName).path)
    },

    absoluteDocumentUrl (outputName) {
      return resolveAbsoluteUrl(documentDefinition(outputName).url)
    },

    absoluteImagePath (outputName, sizeKey) {
      return resolveAbsolutePath(imageDefinition(outputName, sizeKey).path)
    },

    absoluteImageUrl (outputName, sizeKey) {
      return resolveAbsoluteUrl(imageDefinition(outputName, sizeKey).url)
    },

    documentPath (outputName) {
      return resolveRelativePath(documentDefinition(outputName).path)
    },

    documentUrl (outputName) {
      return resolveRelativeUrl(documentDefinition(outputName).url)
    },

    forDocument (outputName) {
      const definition = document[outputName]

      if (!definition) throw new Error(`Undefined document output ${JSON.stringify(outputName)}`)

      return createConsumer(manifest, {
        ...options,

        basePath: definition.path,
        baseUrl: definition.url,
      })
    },

    imagePath (outputName, sizeKey) {
      return resolveRelativePath(imageDefinition(outputName, sizeKey).path)
    },

    imageUrl (outputName, sizeKey) {
      return resolveRelativeUrl(imageDefinition(outputName, sizeKey).url)
    },

    manifest,

    path (toPath) {
      return resolveRelativePath(toPath)
    },

    transform (...transformations) {
      return createConsumer(
        transformations.reduce(
          (manifest, transformation) => transformation(manifest),
          manifest,
        ),
        options,
      )
    },

    url (toUrl) {
      return resolveRelativeUrl(toUrl)
    },
  }

  consumer.renderTagList = createTagListRenderer(consumer)

  return consumer

  function documentDefinition (outputName) {
    return document[outputName] || {}
  }

  function imageDefinition (outputName, sizeKey) {
    const sizes = image[outputName] || {}

    return sizes[sizeKey] || {}
  }

  function resolveAbsolutePath (path) {
    if (!path) return null

    const resolved = outputPath ? resolvePath(outputPath, path) : path

    return isAbsolutePath(resolved) ? resolved : null
  }

  function resolveAbsoluteUrl (url) {
    if (!url) return null

    const resolved = appBaseUrl ? resolveUrl(appBaseUrl, url) : url

    return isAbsoluteUrl(resolved) ? resolved : null
  }

  function resolveRelativePath (path) {
    return path ? relativePath(basePath, path) : null
  }

  function resolveRelativeUrl (url) {
    return url ? relativeUrl(baseUrl, url) : null
  }
}
