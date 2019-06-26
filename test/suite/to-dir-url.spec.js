const {expect} = require('chai')

const {toDirUrl} = require('../../src/url.js')

describe('toDirUrl()', function () {
  it('should append a trailing slash to non-directory URLs', function () {
    expect(toDirUrl('/p')).to.equal('/p/')
    expect(toDirUrl('p')).to.equal('p/')
    expect(toDirUrl('/p/a/t/h')).to.equal('/p/a/t/h/')
    expect(toDirUrl('p/a/t/h')).to.equal('p/a/t/h/')
    expect(toDirUrl('https://iconduit.github.io/p')).to.equal('https://iconduit.github.io/p/')
    expect(toDirUrl('https://iconduit.github.io/p/a/t/h')).to.equal('https://iconduit.github.io/p/a/t/h/')
  })

  it('should not alter directory URLs', function () {
    expect(toDirUrl('/p/')).to.equal('/p/')
    expect(toDirUrl('p/')).to.equal('p/')
    expect(toDirUrl('/p/a/t/h/')).to.equal('/p/a/t/h/')
    expect(toDirUrl('p/a/t/h/')).to.equal('p/a/t/h/')
    expect(toDirUrl('https://iconduit.github.io/p/')).to.equal('https://iconduit.github.io/p/')
    expect(toDirUrl('https://iconduit.github.io/p/a/t/h/')).to.equal('https://iconduit.github.io/p/a/t/h/')
  })
})
