const {expect} = require('chai')

const {relativePath} = require('../../src/path.js')

describe('relativePath()', function () {
  it('should support resolving from absolute paths', function () {
    expect(relativePath('/p/a/t/h', '/p/a/t/x')).to.equal('x')
    expect(relativePath('/p/a/t/h/', '/p/a/t/h/x')).to.equal('x')
    expect(relativePath('/p/a/t/h', '/p/a/t/x/')).to.equal('x/')
    expect(relativePath('/p/a/t/h', '/p/a/t/x/y')).to.equal('x/y')
    expect(relativePath('/p/a/t/h', '/p/a/t/x?y#z')).to.equal('x?y#z')
    expect(relativePath('/p/a/t/h', '/p/a/t/')).to.equal('.')
    expect(relativePath('/p/a/t/h', '/p/a/')).to.equal('..')
    expect(relativePath('/p/a/t/h', '/p/a/x')).to.equal('../x')
    expect(relativePath('/p/a/t/h', '/')).to.equal('../../../')
    expect(relativePath('/p/a/t/h', '/x')).to.equal('../../../x')
  })

  it('should support resolving from absolute paths to already relative URLs', function () {
    expect(relativePath('/p/a/t/h', 'x/y')).to.equal('x/y')
  })

  it('should support resolving from relative paths', function () {
    expect(relativePath('p/a/t/h', 'p/a/t/x')).to.equal('x')
    expect(relativePath('p/a/t/h/', 'p/a/t/h/x')).to.equal('x')
    expect(relativePath('p/a/t/h', 'p/a/t/x/')).to.equal('x/')
    expect(relativePath('p/a/t/h', 'p/a/t/x/y')).to.equal('x/y')
    expect(relativePath('p/a/t/h', 'p/a/t/x?y#z')).to.equal('x?y#z')
    expect(relativePath('p/a/t/h', 'p/a/t/')).to.equal('.')
    expect(relativePath('p/a/t/h', 'p/a/')).to.equal('..')
    expect(relativePath('p/a/t/h', 'p/a/x')).to.equal('../x')
    expect(relativePath('p/a/t/h', '')).to.equal('../../..')
    expect(relativePath('p/a/t/h', 'x')).to.equal('../../../x')
  })
})
