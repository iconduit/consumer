const {join} = require('path')

const {isAbsoluteUrl, relativeUrl, resolveUrl, urlPath} = require('./url.js')
const {createTagRenderer} = require('./template.js')

module.exports = {
  createConsumer,
}

function createConsumer (manifest, options = {}) {
  const {output: {document, image}, urls: {base: appBaseUrl, output: outputBaseUrl}} = manifest

  const {
    basePath = '.',
    baseUrl: optionsBaseUrl,
  } = options

  const baseUrl = optionsBaseUrl || outputBaseUrl

  const consumer = {
    absoluteUrl (url) {
      return resolveAbsolute(url)
    },

    absoluteImageUrl (outputName, sizeKey) {
      return resolveAbsolute(originalImageUrl(outputName, sizeKey))
    },

    documentPath (outputName) {
      return urlToPath(originalDocumentUrl(outputName))
    },

    documentUrl (outputName) {
      return resolveRelative(originalDocumentUrl(outputName))
    },

    forDocument (outputName) {
      const definition = document[outputName]

      if (!definition) throw new Error(`Undefined document output ${JSON.stringify(outputName)}`)

      return createConsumer(manifest, {baseUrl: definition.url})
    },

    imagePath (outputName, sizeKey) {
      return urlToPath(originalImageUrl(outputName, sizeKey))
    },

    imageUrl (outputName, sizeKey) {
      return resolveRelative(originalImageUrl(outputName, sizeKey))
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
      return resolveRelative(toUrl)
    },
  }

  return consumer

  function originalDocumentUrl (outputName) {
    const {url = null} = document[outputName] || {}

    return url
  }

  function originalImageUrl (outputName, sizeKey) {
    const definition = image[outputName] || {}
    const {url = null} = definition[sizeKey] || {}

    return url
  }

  function resolveAbsolute (url) {
    const resolved = appBaseUrl ? resolveUrl(appBaseUrl, url) : url

    return isAbsoluteUrl(resolved) ? resolved : null
  }

  function resolveRelative (url) {
    if (!url) return null

    return relativeUrl(baseUrl, url)
  }

  function urlToPath (url) {
    if (!url) return null

    return join(basePath, urlPath(url))
  }
}
