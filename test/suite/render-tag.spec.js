const {expect} = require('chai')

const {renderTag} = require('../../src/tag.js')

describe('renderTag()', function () {
  it('should require a tag name', function () {
    expect(() => renderTag({})).to.throw('Missing tag name')
  })

  it('should support self-closing tags', function () {
    const data = {
      tag: 'tag-a',
      isSelfClosing: true,
    }

    expect(renderTag(data)).to.equal('<tag-a>')
  })

  it('should support non-self-closing tags', function () {
    const data = {
      tag: 'tag-a',
    }

    expect(renderTag(data)).to.equal('<tag-a></tag-a>')
  })

  it('should support string attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'value-a',
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="value-a"></tag-a>')
  })

  it('should escape string attribute values', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'a & a',
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="a &amp; a"></tag-a>')
  })

  it('should support stringable attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': {
          toString () {
            return 'value-a'
          },
        },
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="value-a"></tag-a>')
  })

  it('should escape stringable attribute values', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': {
          toString () {
            return 'a & a'
          },
        },
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="a &amp; a"></tag-a>')
  })

  it('should support number attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 111,
        'attribute-b': 1.11,
        'attribute-c': 0,
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="111" attribute-b="1.11" attribute-c="0"></tag-a>')
  })

  it('should support boolean attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': true,
        'attribute-b': false,
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a></tag-a>')
  })

  it('should support null attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': null,
      },
    }

    expect(renderTag(data)).to.equal('<tag-a></tag-a>')
  })

  it('should support undefined attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': undefined,
      },
    }

    expect(renderTag(data)).to.equal('<tag-a></tag-a>')
  })

  it('should support multiple attributes', function () {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'value-a',
        'attribute-b': true,
      },
    }

    expect(renderTag(data)).to.equal('<tag-a attribute-a="value-a" attribute-b></tag-a>')
  })

  it('should support child tags', function () {
    const data = {
      tag: 'tag-a',
      children: [
        {
          tag: 'tag-b',
        },
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a><tag-b></tag-b></tag-a>')
  })

  it('should support multiple child tags', function () {
    const data = {
      tag: 'tag-a',
      children: [
        {
          tag: 'tag-b',
        },
        {
          tag: 'tag-c',
          isSelfClosing: true,
        },
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a><tag-b></tag-b><tag-c></tag-a>')
  })

  it('should support nested child tags', function () {
    const data = {
      tag: 'tag-a',
      children: [
        {
          tag: 'tag-b',
          children: [
            {
              tag: 'tag-c',
            },
          ],
        },
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a><tag-b><tag-c></tag-c></tag-b></tag-a>')
  })

  it('should support reused sub-definitions', function () {
    const children = [
      {
        tag: 'tag-c',
        children: [],
      },
    ]
    const child = {
      tag: 'tag-b',
      children,
    }
    const data = {
      tag: 'tag-a',
      children: [
        child,
        child,
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a><tag-b><tag-c></tag-c></tag-b><tag-b><tag-c></tag-c></tag-b></tag-a>')
  })

  it('should not modify the definition supplied to it', function () {
    const data = {
      tag: 'tag-a',
      children: [
        {
          tag: 'tag-b',
        },
      ],
    }
    const copy = JSON.parse(JSON.stringify(data))
    renderTag(data)

    expect(data).to.deep.equal(copy)
  })

  it('should support child HTML strings', function () {
    const data = {
      tag: 'tag-a',
      children: [
        'value-a',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>value-a</tag-a>')
  })

  it('should support multiple HTML string children', function () {
    const data = {
      tag: 'tag-a',
      children: [
        'value-a\n',
        'value-b\n',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>value-a\nvalue-b\n</tag-a>')
  })

  it('should not escape child HTML strings', function () {
    const data = {
      tag: 'tag-a',
      children: [
        'a &amp; a',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>a &amp; a</tag-a>')
  })

  it('should support child numbers', function () {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        111,
        '", "',
        1.11,
        '", "',
        0,
        '"',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>"111", "1.11", "0"</tag-a>')
  })

  it('should support child booleans', function () {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        true,
        '", "',
        false,
        '"',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>"true", ""</tag-a>')
  })

  it('should support child nulls', function () {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        null,
        '"',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>""</tag-a>')
  })

  it('should support undefined children', function () {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        undefined,
        '"',
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>""</tag-a>')
  })

  it('should support mixing child types', function () {
    const data = {
      tag: 'tag-a',
      children: [
        'value-a',
        {
          tag: 'tag-b',
        },
        null,
        {
          tag: 'tag-c',
          isSelfClosing: true,
        },
        111,
      ],
    }

    expect(renderTag(data)).to.equal('<tag-a>value-a<tag-b></tag-b><tag-c>111</tag-a>')
  })

  it('should not support children for self-closing tags', function () {
    expect(() => renderTag({
      tag: 'tag-a',
      isSelfClosing: true,
      children: ['value-a'],
    })).to.throw('Self-closing tags cannot have children')
  })
})
