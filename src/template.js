const htmlTag = require('html-tag')
const {render} = require('ejs')

module.exports = {
  createTagRenderer,
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
