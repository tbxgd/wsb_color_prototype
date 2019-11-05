import React from "react";
import ColorSchemeSwatch from "./ColorSchemeSwatch";
import { generateShades } from "../../Theme/themes/getColorPalette";

export default function ColorShades({ color, setColor, isRecommended }) {
  if (isRecommended) {
    return null;
  }
  return (
    <div className="color-shades">
      <div className="color-layout-wrapper">
        {generateShades(color).map(({ hex }, i) => {
          const selected = hex === color;
          return (
            <ColorSchemeSwatch
              selected={selected}
              key={i}
              start={hex}
              end={hex}
              handleClick={() => setColor(hex)}
            />
          );
        })}
      </div>
    </div>
  );
}
