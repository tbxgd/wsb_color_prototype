import Color from "./Color";
import generate from "./generate";
const mapping = ["light", "lightAlt", "pop", "secondary", "darkAlt", "dark"];
export const hues = [
  "#E02020",
  "#FA6400",
  "#F7B500",
  "#44D7B6",
  "#32C5FF",
  "#6236FF"
  // "#B620E0"
];

export function getColorPalette(color, override) {
  const primary = new Color(color);
  const dark = new Color("#000");
  const darkAlt = primary.setLightness(5).setSaturation(15);
  const light = new Color("#fff");
  const lightAlt = primary.setLightness(95).setSaturation(15);
  const secondary = new Color(override || color);
  return [light, lightAlt, primary, secondary, darkAlt, dark].map((c, i) => ({
    hex: c.toHex(),
    scheme: mapping[i]
  }));
}

export function generateShades(color) {
  const c = new Color(color);
  return [
    {
      hex: c.setLightness(98).toHex()
    },
    {
      hex: c.setLightness(80).toHex()
    },
    {
      hex: c.setLightness(65).toHex()
    },
    {
      hex: c.setLightness(50).toHex()
    },
    {
      hex: c.setLightness(35).toHex()
    },
    {
      hex: c.setLightness(20).toHex()
    },
    {
      hex: c.setLightness(2).toHex()
    }
  ];
}

export function generatePalette(color) {
  const { hue } = new Color(color);
  const input = {
    specs: {
      // Number of colors
      steps: 7,
      // Hue Start Value (0 - 359)
      hue_start: hue,
      // Hue End Value (0 - 359)
      hue_end: hue,
      // Hue Curve (See Curves Section)
      hue_curve: "easeInQuad",
      // Saturation Start Value (0 - 100)
      sat_start: 10,
      // Saturation End Value (0 - 100)
      sat_end: 90,
      // Saturation Curve (See Curves Section)
      sat_curve: "easeOutQuad",
      // Saturation Rate (0 - 200)
      sat_rate: 130,
      // Luminosity Start Value (0 - 100)
      lum_start: 95,
      // Luminosity End Value (0 - 100)
      lum_end: 5,
      // Luminosity Curve (See Curves Section)
      lum_curve: "easeOutQuad",
      // Modifier Scale
      // Every generated color gets a modifier (label) that
      // indicates its lightness. A value of 10 results in
      // two-digit modifiers. The lightest color will be 0 (e.g. Red 0)
      // and the darkest color will be 100 (e.g. Red 100), given
      // that you generate 11 colors
      modifier: 10
    }
  };
  return generate(input).map(({ hex }, i) => ({
    hex,
    scheme: mapping[i]
  }));
}

export const huesAndShades = hues.reduce((acc, hue) => {
  acc[hue] = generatePalette(hue).map(({ hex }) => hex);
  return acc;
}, {});

export function getHue(leaf, val) {
  return (
    Object.keys(leaf).find(prop => prop === val || leaf[prop].includes(val)) ||
    "custom"
  );
}
