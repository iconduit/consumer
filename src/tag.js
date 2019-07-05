const htmlTag = require('html-tag')
const {render} = require('ejs')

module.exports = {
  createTagDefinitionRenderer,
  createTagDefinitionResolver,
  renderTag,
}

function createTagDefinitionRenderer (consumer) {
  const resolveTagDefinitions = createTagDefinitionResolver(consumer)

  return function renderTagDefinitions (definitions) {
    return resolveTagDefinitions(definitions).map(renderTag)
  }
}

function createTagDefinitionResolver (consumer) {
  const {
    output: {
      document,
      image,
    },
  } = consumer.manifest

  return function resolveTagDefinitions (definitions) {
    const resolved = []

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

          const resolveTag = createTagResolver({...consumer, current})
          const tag = resolveTag(definition)

          if (tag) resolved.push(tag)
        }
      } else if (documentName) {
        const current = {
          name: documentName,
          output: document[documentName],
          type: 'document',
          url: consumer.documentUrl.bind(null, documentName),
        }

        const resolveTag = createTagResolver({...consumer, current})
        const tag = resolveTag(definition)

        if (tag) resolved.push(tag)
      } else {
        const resolveTag = createTagResolver({...consumer})
        const tag = resolveTag(definition)

        if (tag) resolved.push(tag)
      }
    }

    return resolved
  }
}

function renderTag (definition) {
  const {attributes, children, tag} = definition

  return htmlTag(tag, attributes, children.map(renderTag).join(''))
}

function createTagResolver (data) {
  function renderValue (value) {
    return render(value, data, {escape: identity})
  }

  return function resolveTag (definition) {
    const {attributes, children, isSelfClosing, predicate, tag} = definition

    for (const value of predicate) {
      if (!renderValue(value)) return null
    }

    const renderedAttributes = {}

    for (const name in attributes) {
      renderedAttributes[name] = renderValue(attributes[name])
    }

    return {
      attributes: renderedAttributes,
      children: children.map(resolveTag),
      isSelfClosing,
      tag,
    }
  }
}

function identity (value) {
  return value
}
