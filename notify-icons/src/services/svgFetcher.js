const axios = require('axios');
const { NotFoundError, FetchError, ValidationError } = require('../middleware/errorHandler');

// Base URL for MDI SVG icons
const MDI_CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/@mdi/svg/svg/';

/**
 * Extract icon name from MDI format (mdi:icon-name)
 * @param {string} mdiIcon - Icon in MDI format (e.g., mdi:weather-sunny)
 * @returns {string} - Extracted icon name (e.g., weather-sunny)
 * @throws {ValidationError} - If icon format is invalid
 */
function extractIconName(mdiIcon) {
  if (!mdiIcon || typeof mdiIcon !== 'string') {
    throw new ValidationError('Icon parameter is required and must be a string');
  }

  // Check if the icon follows the mdi:icon-name format
  const mdiPrefix = 'mdi:';
  if (!mdiIcon.startsWith(mdiPrefix)) {
    throw new ValidationError(`Icon must start with "${mdiPrefix}" (e.g., mdi:weather-sunny)`);
  }

  // Extract the icon name
  const iconName = mdiIcon.substring(mdiPrefix.length);
  
  // Validate icon name format (alphanumeric, hyphens, no spaces)
  if (!/^[a-z0-9-]+$/.test(iconName)) {
    throw new ValidationError('Icon name must contain only lowercase letters, numbers, and hyphens');
  }

  return iconName;
}

/**
 * Fetch SVG from MDI CDN
 * @param {string} iconName - Icon name without mdi: prefix
 * @returns {Promise<string>} - SVG content as string
 * @throws {NotFoundError} - If icon is not found
 * @throws {FetchError} - If there's an error fetching the icon
 */
async function fetchSvg(iconName) {
  const url = `${MDI_CDN_BASE_URL}${iconName}.svg`;
  
  try {
    console.log(`Fetching SVG from: ${url}`);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new NotFoundError(`Icon "${iconName}" not found`);
    }
    console.error('Error fetching SVG:', error.message);
    throw new FetchError(`Failed to fetch SVG: ${error.message}`);
  }
}

module.exports = {
  extractIconName,
  fetchSvg
};
