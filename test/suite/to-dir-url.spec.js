import {toDirUrl} from '../../src/url.js'

describe('toDirUrl()', () => {
  it('should append a trailing slash to non-directory URLs', () => {
    expect(toDirUrl('/p')).toBe('/p/')
    expect(toDirUrl('p')).toBe('p/')
    expect(toDirUrl('/p/a/t/h')).toBe('/p/a/t/h/')
    expect(toDirUrl('p/a/t/h')).toBe('p/a/t/h/')
    expect(toDirUrl('https://iconduit.github.io/p')).toBe('https://iconduit.github.io/p/')
    expect(toDirUrl('https://iconduit.github.io/p/a/t/h')).toBe('https://iconduit.github.io/p/a/t/h/')
  })

  it('should not alter directory URLs', () => {
    expect(toDirUrl('/p/')).toBe('/p/')
    expect(toDirUrl('p/')).toBe('p/')
    expect(toDirUrl('/p/a/t/h/')).toBe('/p/a/t/h/')
    expect(toDirUrl('p/a/t/h/')).toBe('p/a/t/h/')
    expect(toDirUrl('https://iconduit.github.io/p/')).toBe('https://iconduit.github.io/p/')
    expect(toDirUrl('https://iconduit.github.io/p/a/t/h/')).toBe('https://iconduit.github.io/p/a/t/h/')
  })
})
