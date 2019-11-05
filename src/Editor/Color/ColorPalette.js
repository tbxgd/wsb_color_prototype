import React from "react";
import { getColorPalette } from "../../Theme/themes/getColorPalette";

export default function ColorPalette({ color, secondary, scheme }) {
  return (
    <div className="color-palette">
      {getColorPalette(color, secondary).map(({ hex, scheme: s }, i) => {
        return (
          <div
            key={i}
            className="palette-item"
            style={{ backgroundColor: hex }}
          />
        );
      })}
    </div>
  );
}
