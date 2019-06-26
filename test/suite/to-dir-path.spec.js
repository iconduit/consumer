const {expect} = require('chai')

const {toDirPath} = require('../../src/path.js')

describe('toDirPath()', function () {
  it('should append a trailing slash to non-directory paths', function () {
    expect(toDirPath('/p')).to.equal('/p/')
    expect(toDirPath('p')).to.equal('p/')
    expect(toDirPath('/p/a/t/h')).to.equal('/p/a/t/h/')
    expect(toDirPath('p/a/t/h')).to.equal('p/a/t/h/')
  })

  it('should not alter directory paths', function () {
    expect(toDirPath('/p/')).to.equal('/p/')
    expect(toDirPath('p/')).to.equal('p/')
    expect(toDirPath('/p/a/t/h/')).to.equal('/p/a/t/h/')
    expect(toDirPath('p/a/t/h/')).to.equal('p/a/t/h/')
  })
})
