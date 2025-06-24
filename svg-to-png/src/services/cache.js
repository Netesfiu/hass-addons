const NodeCache = require('node-cache');

// Create cache instance with default TTL of 1 hour and check period of 10 minutes
const cache = new NodeCache({
  stdTTL: 3600, // 1 hour in seconds
  checkperiod: 600, // 10 minutes in seconds
  useClones: false // Store references to objects instead of cloning them
});

/**
 * Get item from cache
 * @param {string} key - Cache key
 * @returns {Buffer|null} - Cached PNG buffer or null if not found
 */
function getFromCache(key) {
  return cache.get(key);
}

/**
 * Store item in cache
 * @param {string} key - Cache key
 * @param {Buffer} value - PNG buffer to cache
 * @param {number} [ttl] - Optional TTL in seconds
 * @returns {boolean} - True if successful
 */
function setInCache(key, value, ttl = undefined) {
  return cache.set(key, value, ttl);
}

/**
 * Check if key exists in cache
 * @param {string} key - Cache key
 * @returns {boolean} - True if key exists
 */
function hasInCache(key) {
  return cache.has(key);
}

/**
 * Remove item from cache
 * @param {string} key - Cache key
 * @returns {number} - Number of removed items
 */
function removeFromCache(key) {
  return cache.del(key);
}

/**
 * Get cache statistics
 * @returns {Object} - Cache stats
 */
function getCacheStats() {
  return cache.getStats();
}

/**
 * Clear entire cache
 * @returns {void}
 */
function clearCache() {
  return cache.flushAll();
}

/**
 * Generate a cache key for an MDI icon
 * @param {string} iconName - Icon name without mdi: prefix
 * @param {number} size - Requested size
 * @returns {string} - Cache key
 */
function generateCacheKey(iconName, size) {
  return `${iconName}_${size}`;
}

module.exports = {
  getFromCache,
  setInCache,
  hasInCache,
  removeFromCache,
  getCacheStats,
  clearCache,
  generateCacheKey
};
