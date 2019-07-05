const htmlTag = require('html-tag')
const {render} = require('ejs')

module.exports = {
  createTagListRenderer,
}

function createTagListRenderer (consumer) {
  const {
    output: {
      document,
      image,
    },
  } = consumer.manifest

  return function renderTagList (definitions) {
    const rendered = []

    for (const definition of definitions) {
      const {documentName, imageName} = definition

      if (imageName) {
        const sizes = image[imageName]

        for (const sizeKey in sizes) {
          const current = {
            name: imageName,
            output: sizes[sizeKey],
            size: sizeKey,
            type: 'image',
            url: consumer.imageUrl.bind(null, imageName, sizeKey),
          }

          const renderTag = createTagRenderer({...consumer, current})
          const html = renderTag(definition)

          if (html) rendered.push(html)
        }
      } else if (documentName) {
        const current = {
          name: documentName,
          output: document[documentName],
          type: 'document',
          url: consumer.documentUrl.bind(null, documentName),
        }

        const renderTag = createTagRenderer({...consumer, current})
        const html = renderTag(definition)

        if (html) rendered.push(html)
      } else {
        const renderTag = createTagRenderer({...consumer})
        const html = renderTag(definition)

        if (html) rendered.push(html)
      }
    }

    return rendered
  }
}

function createTagRenderer (data) {
  function renderValue (value) {
    return render(value, data, {escape: identity})
  }

  return function renderTag (definition) {
    const {attributes, children, predicate, tag} = definition

    for (const value of predicate) {
      if (!renderValue(value)) return null
    }

    const renderedAttributes = {}

    for (const name in attributes) {
      renderedAttributes[name] = renderValue(attributes[name])
    }

    const renderedChildren = children.map(renderTag)
    const innerHtml = renderedChildren.join('')

    return htmlTag(tag, renderedAttributes, innerHtml)
  }
}

function identity (value) {
  return value
}
