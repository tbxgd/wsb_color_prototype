import React from "react";
import ToolTip from "react-tooltip";

export default function ColorWheel({ color, setShowHueSlider, selected }) {
  const classNames = `scheme-swatch color-wheel ${selected ? "selected" : ""}`;
  return (
    <React.Fragment>
      <div className="swatch-item" data-tip="Custom Color">
        <div className={classNames} onClick={setShowHueSlider} />
      </div>
      <ToolTip effect="solid" />
    </React.Fragment>
  );
}
