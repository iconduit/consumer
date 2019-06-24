const {isAbsolutePath, relativePath} = require('./path.js')
const {isAbsoluteUrl, relativeUrl, resolveUrl} = require('./url.js')
const {createTagRenderer} = require('./template.js')

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
        basePath,
        baseUrl: definition.url,
        outputPath,
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

    renderTagList (definitions) {
      const rendered = []

      for (const definition of definitions) {
        const {documentName, imageName} = definition

        if (imageName) {
          const sizes = image[imageName]

          for (const sizeKey in sizes) {
            const output = sizes[sizeKey]
            const renderTag = createTagRenderer({consumer, manifest, output, outputName: imageName, sizeKey})
            const html = renderTag(definition)

            if (html) rendered.push(html)
          }
        } else if (documentName) {
          const output = document[documentName]
          const renderTag = createTagRenderer({consumer, manifest, output, outputName: documentName})
          const html = renderTag(definition)

          if (html) rendered.push(html)
        } else {
          const renderTag = createTagRenderer({consumer, manifest})
          const html = renderTag(definition)

          if (html) rendered.push(html)
        }
      }

      return rendered
    },

    url (toUrl) {
      return resolveRelativeUrl(toUrl)
    },
  }

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

    const resolved = outputPath ? resolveUrl(outputPath, path) : path

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
