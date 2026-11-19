const sharp = require('sharp');
const { ConversionError } = require('../middleware/errorHandler');

// Valid background shapes
const VALID_SHAPES = ['none', 'circle', 'square', 'rounded-square'];

// Default padding (as percentage of size)
const DEFAULT_PADDING = 10;

/**
 * Convert SVG string to PNG buffer with optional styling
 * @param {string} svgString - SVG content as string
 * @param {Object} options - Conversion options
 * @param {number} options.size - Width and height of the output PNG
 * @param {string} [options.iconColor] - Color for the icon (hex, rgb, etc.)
 * @param {string} [options.bgColor] - Background color (hex, rgb, etc.)
 * @param {string} [options.bgShape] - Background shape (none, circle, square, rounded-square)
 * @param {number} [options.padding] - Padding around icon as percentage of size (0-50)
 * @returns {Promise<Buffer>} - PNG buffer
 * @throws {ConversionError} - If conversion fails
 */
async function convertSvgToPng(svgString, options) {
  try {
    // Extract and validate options
    const size = parseInt(options.size, 10);
    if (isNaN(size) || size <= 0) {
      throw new Error('Size must be a positive number');
    }

    const iconColor = options.iconColor || null;
    const bgColor = options.bgColor || null;
    const bgShape = options.bgShape || 'none';
    const padding = options.padding !== undefined ? parseInt(options.padding, 10) : DEFAULT_PADDING;

    // Validate shape
    if (!VALID_SHAPES.includes(bgShape)) {
      throw new Error(`Invalid background shape. Must be one of: ${VALID_SHAPES.join(', ')}`);
    }

    // Validate padding
    if (isNaN(padding) || padding < 0 || padding > 50) {
      throw new Error('Padding must be between 0 and 50 percent');
    }

    // Modify SVG color if specified
    let modifiedSvg = svgString;
    if (iconColor) {
      // Add fill attribute to the SVG to change its color
      modifiedSvg = modifiedSvg.replace('<svg', `<svg fill="${iconColor}"`);
    }

    // Create a transparent PNG from the SVG
    let image = sharp(Buffer.from(modifiedSvg))
      .resize(size, size)
      .png();

    // If no background is needed, return the image directly
    if (bgShape === 'none' || !bgColor) {
      return await image.toBuffer();
    }

    // Calculate padding in pixels
    const paddingPixels = Math.round((size * padding) / 100);
    const innerSize = size - (paddingPixels * 2);

    // Create a composite image with background
    const composite = [];
    
    // Create background shape
    let background;
    const bgSize = size;
    
    if (bgShape === 'circle') {
      // Create a circle
      background = Buffer.from(
        `<svg width="${bgSize}" height="${bgSize}" viewBox="0 0 ${bgSize} ${bgSize}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="${bgSize/2}" cy="${bgSize/2}" r="${bgSize/2}" fill="${bgColor}" />
        </svg>`
      );
    } else if (bgShape === 'rounded-square') {
      // Create a rounded square (rectangle with rounded corners)
      const radius = bgSize / 8; // Radius is 1/8 of the size for a nice rounded corner
      background = Buffer.from(
        `<svg width="${bgSize}" height="${bgSize}" viewBox="0 0 ${bgSize} ${bgSize}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${bgSize}" height="${bgSize}" rx="${radius}" ry="${radius}" fill="${bgColor}" />
        </svg>`
      );
    } else { // square
      // Create a square
      background = Buffer.from(
        `<svg width="${bgSize}" height="${bgSize}" viewBox="0 0 ${bgSize} ${bgSize}" xmlns="http://www.w3.org/2000/svg">
          <rect width="${bgSize}" height="${bgSize}" fill="${bgColor}" />
        </svg>`
      );
    }

    // Add background to composite
    composite.push({
      input: await sharp(background).png().toBuffer(),
      top: 0,
      left: 0
    });

    // Resize the icon with padding
    const resizedIcon = await image
      .resize(innerSize, innerSize)
      .toBuffer();

    // Add icon to composite
    composite.push({
      input: resizedIcon,
      top: paddingPixels,
      left: paddingPixels
    });

    // Create the final composite image
    const finalImage = await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite(composite)
    .png()
    .toBuffer();

    return finalImage;
  } catch (error) {
    console.error('Error converting SVG to PNG:', error.message);
    throw new ConversionError(`Failed to convert SVG to PNG: ${error.message}`);
  }
}

module.exports = {
  convertSvgToPng,
  VALID_SHAPES
};
