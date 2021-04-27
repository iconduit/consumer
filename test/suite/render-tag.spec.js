const {renderTag} = require('../../src/tag.js')

describe('renderTag()', () => {
  it('should require a tag name', () => {
    expect(() => renderTag({})).toThrow('Missing tag name')
  })

  it('should support self-closing tags', () => {
    const data = {
      tag: 'tag-a',
      isSelfClosing: true,
    }

    expect(renderTag(data)).toBe('<tag-a>')
  })

  it('should support non-self-closing tags', () => {
    const data = {
      tag: 'tag-a',
    }

    expect(renderTag(data)).toBe('<tag-a></tag-a>')
  })

  it('should support string attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'value-a',
      },
    }

    expect(renderTag(data)).toBe('<tag-a attribute-a="value-a"></tag-a>')
  })

  it('should escape string attribute values', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'a & a',
      },
    }

    expect(renderTag(data)).toBe('<tag-a attribute-a="a &amp; a"></tag-a>')
  })

  it('should support stringable attributes', () => {
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

    expect(renderTag(data)).toBe('<tag-a attribute-a="value-a"></tag-a>')
  })

  it('should escape stringable attribute values', () => {
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

    expect(renderTag(data)).toBe('<tag-a attribute-a="a &amp; a"></tag-a>')
  })

  it('should support number attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 111,
        'attribute-b': 1.11,
        'attribute-c': 0,
      },
    }

    expect(renderTag(data)).toBe('<tag-a attribute-a="111" attribute-b="1.11" attribute-c="0"></tag-a>')
  })

  it('should support boolean attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': true,
        'attribute-b': false,
      },
    }

    expect(renderTag(data)).toBe('<tag-a attribute-a></tag-a>')
  })

  it('should support null attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': null,
      },
    }

    expect(renderTag(data)).toBe('<tag-a></tag-a>')
  })

  it('should support undefined attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': undefined,
      },
    }

    expect(renderTag(data)).toBe('<tag-a></tag-a>')
  })

  it('should support multiple attributes', () => {
    const data = {
      tag: 'tag-a',
      attributes: {
        'attribute-a': 'value-a',
        'attribute-b': true,
      },
    }

    expect(renderTag(data)).toBe('<tag-a attribute-a="value-a" attribute-b></tag-a>')
  })

  it('should support child tags', () => {
    const data = {
      tag: 'tag-a',
      children: [
        {
          tag: 'tag-b',
        },
      ],
    }

    expect(renderTag(data)).toBe('<tag-a><tag-b></tag-b></tag-a>')
  })

  it('should support multiple child tags', () => {
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

    expect(renderTag(data)).toBe('<tag-a><tag-b></tag-b><tag-c></tag-a>')
  })

  it('should support nested child tags', () => {
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

    expect(renderTag(data)).toBe('<tag-a><tag-b><tag-c></tag-c></tag-b></tag-a>')
  })

  it('should support reused sub-definitions', () => {
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

    expect(renderTag(data)).toBe('<tag-a><tag-b><tag-c></tag-c></tag-b><tag-b><tag-c></tag-c></tag-b></tag-a>')
  })

  it('should not modify the definition supplied to it', () => {
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

    expect(data).toEqual(copy)
  })

  it('should support child HTML strings', () => {
    const data = {
      tag: 'tag-a',
      children: [
        'value-a',
      ],
    }

    expect(renderTag(data)).toBe('<tag-a>value-a</tag-a>')
  })

  it('should support multiple HTML string children', () => {
    const data = {
      tag: 'tag-a',
      children: [
        'value-a\n',
        'value-b\n',
      ],
    }

    expect(renderTag(data)).toBe('<tag-a>value-a\nvalue-b\n</tag-a>')
  })

  it('should not escape child HTML strings', () => {
    const data = {
      tag: 'tag-a',
      children: [
        'a &amp; a',
      ],
    }

    expect(renderTag(data)).toBe('<tag-a>a &amp; a</tag-a>')
  })

  it('should support child numbers', () => {
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

    expect(renderTag(data)).toBe('<tag-a>"111", "1.11", "0"</tag-a>')
  })

  it('should support child booleans', () => {
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

    expect(renderTag(data)).toBe('<tag-a>"true", ""</tag-a>')
  })

  it('should support child nulls', () => {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        null,
        '"',
      ],
    }

    expect(renderTag(data)).toBe('<tag-a>""</tag-a>')
  })

  it('should support undefined children', () => {
    const data = {
      tag: 'tag-a',
      children: [
        '"',
        undefined,
        '"',
      ],
    }

    expect(renderTag(data)).toBe('<tag-a>""</tag-a>')
  })

  it('should support mixing child types', () => {
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

    expect(renderTag(data)).toBe('<tag-a>value-a<tag-b></tag-b><tag-c>111</tag-a>')
  })

  it('should not support children for self-closing tags', () => {
    expect(() => renderTag({
      tag: 'tag-a',
      isSelfClosing: true,
      children: ['value-a'],
    })).toThrow('Self-closing tags cannot have children')
  })
})
