const sharp = require('sharp');
const { ConversionError } = require('../middleware/errorHandler');

/**
 * Convert SVG string to PNG buffer
 * @param {string} svgString - SVG content as string
 * @param {number} size - Width and height of the output PNG
 * @returns {Promise<Buffer>} - PNG buffer
 * @throws {ConversionError} - If conversion fails
 */
async function convertSvgToPng(svgString, size) {
  try {
    // Validate size
    const pngSize = parseInt(size, 10);
    if (isNaN(pngSize) || pngSize <= 0) {
      throw new Error('Size must be a positive number');
    }

    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svgString))
      .resize(pngSize, pngSize)
      .png()
      .toBuffer();

    return pngBuffer;
  } catch (error) {
    console.error('Error converting SVG to PNG:', error.message);
    throw new ConversionError(`Failed to convert SVG to PNG: ${error.message}`);
  }
}

module.exports = {
  convertSvgToPng
};
