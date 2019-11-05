import React from "react";
import ColorPickerCategory from "./ColorPickerCategory";

const labelMap = {
  logo: "Logo",
  image: "Cover Image"
};

export default function ColorImage({ url, colors, setColor, label, type }) {
  const img =
    type === "image" ? (
      <div
        style={{
          width: "100%",
          height: "120px",
          backgroundImage: `url(${url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      />
    ) : (
      <div
        style={{
          width: "100%",
          height: "120px",
          backgroundColor: colors.length && colors[0].hex,
          padding: "20px"
        }}
      >
        <div
          style={{
            height: "100%",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${url})`
          }}
        />
      </div>
    );

  return (
    <div className="color-picker-image">
      <p className="color-picker-label">{`Colors from ${labelMap[type]}`}</p>
      {img}
      <ColorPickerCategory colors={colors} setColor={setColor} />
    </div>
  );
}
