import urlParse from 'url-parse'

import {relativePath, resolvePath, toDirPath} from './path.js'

/**
 * Determine whether the supplied URL is absolute.
 */
export function isAbsoluteUrl (url) {
  if (typeof url !== 'string') throw new Error('URL must be a string')

  const parsed = urlParse(url)

  return !!parsed.host
}

/**
 * Get a relative URL from one URL to another.
 *
 * Supports relative URLs.
 */
export function relativeUrl (fromUrl, toUrl) {
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
export function resolveUrl (baseUrl, url) {
  if (typeof baseUrl !== 'string') throw new Error('Base URL must be a string')
  if (typeof url !== 'string') throw new Error('URL must be a string')

  const baseUrlParsed = urlParse(baseUrl)

  if (baseUrlParsed.host) return urlParse(url, baseUrl).toString()

  const urlParsed = urlParse(url)
  urlParsed.pathname = resolvePath(baseUrlParsed.pathname, urlParsed.pathname)

  return urlParsed.toString()
}

/**
 * Append a trailing slash if the supplied URL is not already a directory URL.
 */
export function toDirUrl (url) {
  if (typeof url !== 'string') throw new Error('URL must be a string')

  const urlParsed = urlParse(url)
  urlParsed.pathname = toDirPath(urlParsed.pathname)

  return urlParsed.toString()
}

function urlPathname (parsed) {
  const {host, pathname} = parsed

  if (!host) return pathname

  return pathname || '/'
}
