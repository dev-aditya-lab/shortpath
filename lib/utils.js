/**
 * Ensures URL has http:// or https:// scheme
 * @param {string} url - URL to normalize
 * @returns {string} - Normalized URL with scheme
 */
export function ensureHttpScheme(url) {
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  return `https://${url}`;
}

/**
 * Validates if string is a valid URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export function isValidUrl(url) {
  try {
    const normalized = ensureHttpScheme(url);
    new URL(normalized);
    return true;
  } catch {
    return false;
  }
}
