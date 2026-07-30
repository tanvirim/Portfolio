import parseHexColor from "./parseHexColor";

// Picks white or near-black — whichever contrasts more — against a given
// hex background color, so text/glyphs stay readable regardless of how
// dark or light that background happens to be.
function getContrastColor(hex) {
  const { r, g, b } = parseHexColor(hex, { r: 255, g: 255, b: 255 });
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#101418" : "#ffffff";
}

export default getContrastColor;
