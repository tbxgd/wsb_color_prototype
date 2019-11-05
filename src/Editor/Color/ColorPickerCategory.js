import React, { useState, useEffect, useMemo } from "react";
import ColorSchemeSwatch from "./ColorSchemeSwatch";

import { huesAndShades, getHue } from "../../Theme/themes/getColorPalette";

function filter(arr) {
  const hash = {};
  return arr.filter(({ hex }) => {
    if (hash[hex]) {
      return false;
    }
    hash[hex] = hex;
    return true;
  });
}

export default function ColorPickerCategory({
  isRecommended,
  colors,
  setColor,
  color
}) {
  const filtered = useMemo(() => {
    return filter(colors);
  }, [colors]);

  return colors.length ? (
    <div>
      <div className="color-picker-category">
        <div className="color-layout-wrapper">
          {filtered.map(({ hex, type }, i) => {
            const selected = hex === color;
            return (
              <ColorSchemeSwatch
                type={type}
                isRecommended={isRecommended}
                selected={selected}
                key={i}
                start={hex}
                end={hex}
                handleClick={() => {
                  setColor(hex);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : null;
}
