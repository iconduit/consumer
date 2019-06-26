const {dirname, isAbsolute, normalize, relative, sep} = require('path')

module.exports = {
  isAbsolutePath,
  relativePath,
  resolvePath,
  toDirPath,
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
  const relatived = normalizePath(relative(fromDirPath, toPath))

  if (!isDirPath(toPath) || isDirPath(relatived)) return relatived

  return `${relatived}/`
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
 * Append a trailing slash if the supplied path is not already a directory path.
 */
function toDirPath (path) {
  if (typeof path !== 'string') throw new Error('Path must be a string')

  return isDirPath(path) ? path : path + '/'
}

/**
 * Normalize the supplied path, but use forward slashes regardless of platform.
 *
 * Also trims unnecessary trailing slashes for cross-platform consistency.
 */
function normalizePath (path) {
  const normalized = normalize(path).replace(sep, '/')

  return normalized.endsWith('/') && isPathDotTerminated(normalized) ? normalized.slice(0, -1) : normalized
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
  return path.endsWith('/') || isPathDotTerminated(path)
}

/**
 * Determine if a path ends with a .. or . atom.
 *
 * Assumes the supplied path is already normalized.
 */
function isPathDotTerminated (path) {
  if (path.endsWith('/')) path = path.slice(0, -1)

  if (path === '..' || path === '.') return true

  const lastSlashIndex = path.lastIndexOf('/')

  if (lastSlashIndex < 0) return false

  const lastAtom = path.substring(lastSlashIndex + 1)

  return lastAtom === '..' || lastAtom === '.'
}
