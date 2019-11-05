import React, { useRef, useEffect, useState } from "react";
import useDimensions from "./useDimensions";

export default function Align({ index, node, children }) {
  const [style, setStyle] = useState(index);
  const ref = useRef(null);
  const dimensions = useDimensions(node);

  useEffect(() => {
    if (dimensions && ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setStyle({
        top: dimensions.top + (height - 24),
        left: dimensions.right - (width + 24)
      });
    }
  }, [dimensions]);

  return (
    <div
      className="align-container"
      ref={ref}
      style={{ position: "fixed", ...style }}
    >
      {children}
    </div>
  );
}
