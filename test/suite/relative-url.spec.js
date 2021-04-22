import {relativeUrl} from '../../src/url.js'

describe('relativeUrl()', () => {
  it('should support resolving from absolute URLs with the same origin', () => {
    expect(relativeUrl('https://iconduit.github.io/', 'https://iconduit.github.io/')).toBe('.')
    expect(relativeUrl('https://iconduit.github.io', 'https://iconduit.github.io/')).toBe('.')
    expect(relativeUrl('https://iconduit.github.io/', 'https://iconduit.github.io')).toBe('.')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/h')).toBe('h')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/x')).toBe('x')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h/', 'https://iconduit.github.io/p/a/t/h/x')).toBe('x')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/x/')).toBe('x/')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/x/y')).toBe('x/y')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/x?y#z')).toBe('x?y#z')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/t/')).toBe('.')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/')).toBe('..')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/p/a/x')).toBe('../x')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/')).toBe('../../..')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'https://iconduit.github.io/x')).toBe('../../../x')
  })

  it('should support resolving from absolute URLs with a different origin', () => {
    expect(relativeUrl('https://example.org/', 'https://iconduit.github.io/p/a/t/h')).toBe('https://iconduit.github.io/p/a/t/h')
  })

  it('should support resolving from absolute URLs to already relative URLs', () => {
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', 'x/y')).toBe('x/y')
    expect(relativeUrl('https://iconduit.github.io/p/a/t/h', '/x/y')).toBe('/x/y')
  })

  it('should support resolving from relative URLs with a leading slash', () => {
    expect(relativeUrl('/p/a/t/h', '/p/a/t/x')).toBe('x')
    expect(relativeUrl('/p/a/t/h/', '/p/a/t/h/x')).toBe('x')
    expect(relativeUrl('/p/a/t/h', '/p/a/t/x/')).toBe('x/')
    expect(relativeUrl('/p/a/t/h', '/p/a/t/x/y')).toBe('x/y')
    expect(relativeUrl('/p/a/t/h', '/p/a/t/x?y#z')).toBe('x?y#z')
    expect(relativeUrl('/p/a/t/h', '/p/a/t/')).toBe('.')
    expect(relativeUrl('/p/a/t/h', '/p/a/')).toBe('..')
    expect(relativeUrl('/p/a/t/h', '/p/a/x')).toBe('../x')
    expect(relativeUrl('/p/a/t/h', '/')).toBe('../../..')
    expect(relativeUrl('/p/a/t/h', '/x')).toBe('../../../x')
  })

  it('should support resolving from relative URLs with a leading slash to already relative URLs', () => {
    expect(relativeUrl('/p/a/t/h', 'x/y')).toBe('x/y')
  })

  it('should support resolving from relative URLs without a leading slash', () => {
    expect(relativeUrl('p/a/t/h', 'p/a/t/x')).toBe('x')
    expect(relativeUrl('p/a/t/h/', 'p/a/t/h/x')).toBe('x')
    expect(relativeUrl('p/a/t/h', 'p/a/t/x/')).toBe('x/')
    expect(relativeUrl('p/a/t/h', 'p/a/t/x/y')).toBe('x/y')
    expect(relativeUrl('p/a/t/h', 'p/a/t/x?y#z')).toBe('x?y#z')
    expect(relativeUrl('p/a/t/h', 'p/a/t/')).toBe('.')
    expect(relativeUrl('p/a/t/h', 'p/a/')).toBe('..')
    expect(relativeUrl('p/a/t/h', 'p/a/x')).toBe('../x')
    expect(relativeUrl('p/a/t/h', '')).toBe('../../..')
    expect(relativeUrl('p/a/t/h', 'x')).toBe('../../../x')
  })
})
