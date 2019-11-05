import React, { useState } from "react";

export default function SegmentedControl({ panels = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="segmented-control">
      <div className="tab-controls">
        {panels.map((panel, i) => {
          const classname = `tab-control ${activeIndex === i ? "active" : ""}`;
          return (
            <button
              style={{ "--basis": `${(1 / panels.length) * 100}%` }}
              key={i}
              className={classname}
              onClick={() => setActiveIndex(i)}
            >
              {panel.label}
            </button>
          );
        })}
      </div>
      {panels.length && (
        <div className="panel-wrapper">{panels[activeIndex].el}</div>
      )}
    </div>
  );
}
