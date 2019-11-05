import React, { useState } from "react";

export default function SegmentedControl({ panels = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="segmented-control">
      <select onChange={({ target }) => setActiveIndex(target.value)}>
        {panels.map((panel, i) => {
          const classname = `tab-control ${activeIndex === i ? "active" : ""}`;
          return (
            <option key={i} value={i} className={classname}>
              {panel.label}
            </option>
          );
        })}
      </select>
      {panels.length && (
        <div className="panel-wrapper">{panels[activeIndex].el}</div>
      )}
    </div>
  );
}
