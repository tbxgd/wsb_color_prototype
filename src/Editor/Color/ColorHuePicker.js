import React, { useEffect, useRef } from "react";
import { CustomPicker } from "react-color";
import { Saturation, Hue } from "react-color/lib/components/common";
import ColorInput from "./ColorInput";

const Picker = CustomPicker(props => {
  return (
    <div className="custom-picker">
      <div className="wrapper saturation">
        <Saturation {...props} />
      </div>

      <div className="wrapper hue">
        <div className="wrapper">
          <Hue {...props} />
        </div>
      </div>
    </div>
  );
});

export default function ColorHuePicker({
  color,
  setColor,
  showPicker,
  setShowPicker
}) {
  const ref = useRef();

  useEffect(() => {
    const handleClick = e => {
      if (showPicker && ref.current && !ref.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showPicker, setShowPicker]);

  return (
    showPicker && (
      <div ref={ref} className="picker-popover">
        <Picker
          color={color}
          onChange={({ hex }) => {
            setColor(hex);
          }}
        />
        <div className="input-row flex split center">
          <ColorInput color={color} setColor={setColor} />
          <button
            className="done-btn"
            onClick={() => {
              setShowPicker(false);
            }}
          >
            Done
          </button>
        </div>
      </div>
    )
  );
}
