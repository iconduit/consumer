const escapeHtml = require('escape-html')
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
  const result = [definition]
  const toRender = [result]

  for (let i = 0; i < toRender.length; ++i) {
    const list = toRender[i]

    for (let j = 0; j < list.length; ++j) {
      const entry = list[j]

      if (!entry || typeof entry !== 'object') continue

      const {
        attributes = {},
        children = [],
        isSelfClosing = false,
        tag,
      } = list[j]

      if (!tag) throw new Error('Missing tag name')
      if (isSelfClosing && children.length > 0) throw new Error('Self-closing tags cannot have children')

      const copy = {
        attributes,
        children: children.slice(),
        isSelfClosing,
        tag,
      }

      list[j] = copy
      if (children.length > 0) toRender.push(copy.children)
    }
  }

  for (let i = toRender.length - 1; i >= 0; --i) {
    const list = toRender[i]

    for (let j = 0; j < list.length; ++j) {
      const entry = list[j]
      const type = typeof entry

      if (!entry && type !== 'number') {
        list[j] = ''

        continue
      }

      if (type !== 'object') continue

      const {attributes, children, isSelfClosing, tag} = entry

      let renderedAttributes = ''

      for (const name in attributes) {
        const value = attributes[name]

        if (value === true) {
          renderedAttributes += ` ${name}`
        } else if (value || typeof value === 'number') {
          renderedAttributes += ` ${name}="${escapeHtml(value)}"`
        }
      }

      const openingTag = `<${tag}${renderedAttributes}>`
      const closingTag = isSelfClosing ? '' : `</${tag}>`

      list[j] = openingTag + children.join('') + closingTag
    }
  }

  return result[0]
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
