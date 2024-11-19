/**
 * Escape special character regex
 * @param str
 * @returns
 */

export function escapeRegExp(str?: string) {
  return str ? str.replace(/[.*~+?^${}()|[\]\\]/g, '\\$&') : str || '' // $& means the whole matched string
}
