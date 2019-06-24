const {dirname, isAbsolute, normalize, relative, sep} = require('path')

module.exports = {
  isAbsolutePath,
  relativePath,
  resolvePath,
}

/**
 * Determine whether the supplied path is absolute.
 */
function isAbsolutePath (path) {
  if (typeof path !== 'string') throw new Error('Path must be a string')

  return isAbsolute(path)
}

/**
 * Get a relative path from one path to another, using rules compatible with
 * URLs.
 *
 * Trailing slashes are significant.
 */
function relativePath (fromPath, toPath) {
  if (typeof fromPath !== 'string') throw new Error('From path must be a string')
  if (typeof toPath !== 'string') throw new Error('To path must be a string')

  toPath = normalizePath(toPath)

  if (isAbsolutePath(fromPath) !== isAbsolutePath(toPath)) return toPath

  fromPath = normalizePath(fromPath)

  const fromDirPath = isDirPath(fromPath) ? fromPath : dirname(fromPath)
  const relatived = relative(fromDirPath, toPath)

  if (!isDirPath(toPath) || isDirPath(relatived)) return relatived

  return relatived ? `${relatived}/` : '.'
}

/**
 * Resolve a path against a base path, using rules compatible with URLs.
 *
 * Trailing slashes are significant.
 */
function resolvePath (basePath, path) {
  if (typeof basePath !== 'string') throw new Error('Base path must be a string')
  if (typeof path !== 'string') throw new Error('Path must be a string')

  basePath = normalizePath(basePath)

  if (path === '') return basePath

  path = normalizePath(path)

  if (isAbsolutePath(path)) return path

  const baseDirPath = isDirPath(basePath) ? basePath : dirname(basePath)
  const joined = normalizePath(`${baseDirPath}/${path}`)

  if (!isDirPath(path)) return joined

  return isDirPath(joined) ? joined : `${joined}/`
}

/**
 * Normalize the supplied path, but use forward slashes regardless of platform.
 */
function normalizePath (path) {
  return normalize(path).replace(sep, '/')
}

/**
 * Determine if a path represents a directory, using rules compatible with URLs.
 *
 * Assumes the supplied path is already normalized.
 *
 * Examples of directory paths:
 *   - a/
 *   - a/b
 *   - a/..
 *   - .
 *   - ..
 *
 * Examples of non-directory paths:
 *   - a
 *   - a/b
 *   - ../a
 *   - a/../b
 */
function isDirPath (path) {
  if (path === '.' || path.endsWith('/')) return true

  const lastSlashIndex = path.lastIndexOf('/')

  if (lastSlashIndex < 0) return path === '..'

  return path.substring(lastSlashIndex + 1) === '..'
}
