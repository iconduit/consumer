const urlParse = require('url-parse')

const {relativePath, resolvePath} = require('./path.js')

module.exports = {
  isAbsoluteUrl,
  relativeUrl,
  resolveUrl,
}

/**
 * Determine whether the supplied URL is absolute.
 */
function isAbsoluteUrl (url) {
  if (typeof url !== 'string') throw new Error('URL must be a string')

  const parsed = urlParse(url)

  return !!parsed.host
}

/**
 * Get a relative URL from one URL to another.
 *
 * Supports relative URLs.
 */
function relativeUrl (fromUrl, toUrl) {
  if (typeof fromUrl !== 'string') throw new Error('From URL must be a string')
  if (typeof toUrl !== 'string') throw new Error('To URL must be a string')

  const fromUrlParsed = urlParse(fromUrl)
  const toUrlParsed = urlParse(toUrl)

  if (fromUrlParsed.origin !== toUrlParsed.origin) return toUrl

  toUrlParsed.protocol = ''
  toUrlParsed.slashes = false
  toUrlParsed.auth = ''
  toUrlParsed.host = ''
  toUrlParsed.port = ''

  toUrlParsed.pathname = relativePath(urlPathname(fromUrlParsed), urlPathname(toUrlParsed))

  return toUrlParsed.toString()
}

/**
 * Resolve a URL against another URL.
 *
 * Supports relative URLs.
 */
function resolveUrl (baseUrl, url) {
  if (typeof baseUrl !== 'string') throw new Error('Base URL must be a string')
  if (typeof url !== 'string') throw new Error('URL must be a string')

  const baseUrlParsed = urlParse(baseUrl)

  if (baseUrlParsed.host) return urlParse(url, baseUrl).toString()

  const urlParsed = urlParse(url)
  urlParsed.pathname = resolvePath(baseUrlParsed.pathname, urlParsed.pathname)

  return urlParsed.toString()
}

function urlPathname (parsed) {
  const {host, pathname} = parsed

  if (!host) return pathname

  return pathname || '/'
}
