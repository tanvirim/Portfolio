// Utility function to safely parse a hex color
function parseHexColor(hexColor, defaultValue) {
    try {
      // Remove the '#' symbol if present
      hexColor = hexColor.replace(/^#/, '');
  
      // Ensure the hex color is a valid format
      if (/^[0-9A-Fa-f]{6}$/.test(hexColor)) {
        return {
          r: parseInt(hexColor.slice(0, 2), 16),
          g: parseInt(hexColor.slice(2, 4), 16),
          b: parseInt(hexColor.slice(4, 6), 16),
        };
      }
    } catch (error) {
      console.error('Error parsing hex color:', error);
    }
  
    // Return the default value if parsing fails
    return defaultValue;
  }
  export default parseHexColor;
  
  // Usage
  // const color = parseHexColor('#ff0000', { r: 255, g: 255, b: 255 }