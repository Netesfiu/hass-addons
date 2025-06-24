const express = require('express');
const router = express.Router();
const { extractIconName, fetchSvg } = require('../services/svgFetcher');
const { convertSvgToPng } = require('../services/converter');
const { generateCacheKey, hasInCache, getFromCache, setInCache } = require('../services/cache');
const { ValidationError } = require('../middleware/errorHandler');

// Default size for PNG output
const DEFAULT_SIZE = 96;

/**
 * GET /mdi.png
 * Convert MDI SVG icon to PNG
 * Query parameters:
 *   - icon: MDI icon name (e.g., mdi:weather-sunny)
 *   - size: PNG size in pixels (optional, default: 96)
 */
router.get('/mdi.png', async (req, res, next) => {
  try {
    const { icon, size = DEFAULT_SIZE } = req.query;
    
    // Validate icon parameter
    if (!icon) {
      throw new ValidationError('Icon parameter is required');
    }
    
    // Extract icon name from MDI format
    const iconName = extractIconName(icon);
    
    // Parse and validate size
    const pngSize = parseInt(size, 10) || DEFAULT_SIZE;
    if (pngSize <= 0 || pngSize > 1024) {
      throw new ValidationError('Size must be between 1 and 1024 pixels');
    }
    
    // Generate cache key
    const cacheKey = generateCacheKey(iconName, pngSize);
    
    // Check if PNG is in cache
    if (hasInCache(cacheKey)) {
      console.log(`Cache hit for ${icon} at size ${pngSize}px`);
      const pngBuffer = getFromCache(cacheKey);
      
      // Set response headers and send PNG
      res.set('Content-Type', 'image/png');
      res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      return res.send(pngBuffer);
    }
    
    console.log(`Cache miss for ${icon} at size ${pngSize}px`);
    
    // Fetch SVG from CDN
    const svgString = await fetchSvg(iconName);
    
    // Convert SVG to PNG
    const pngBuffer = await convertSvgToPng(svgString, pngSize);
    
    // Store PNG in cache
    setInCache(cacheKey, pngBuffer);
    
    // Set response headers and send PNG
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
    res.send(pngBuffer);
    
  } catch (error) {
    next(error);
  }
});

/**
 * GET /cache/stats
 * Get cache statistics
 */
router.get('/cache/stats', (req, res) => {
  const stats = require('../services/cache').getCacheStats();
  res.json(stats);
});

/**
 * POST /cache/clear
 * Clear the cache
 */
router.post('/cache/clear', (req, res) => {
  require('../services/cache').clearCache();
  res.json({ message: 'Cache cleared successfully' });
});

module.exports = router;
