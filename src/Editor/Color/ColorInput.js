import React, { useState, useEffect } from "react";

export function ColorIndicator({ color, onClick }) {
  return (
    <label
      onClick={onClick}
      className="native-color-input-wrapper"
      htmlFor="native-color-input"
    >
      <div
        className="color-indicator"
        style={{
          backgroundColor: color
        }}
      />
    </label>
  );
}

function ColorInput({ color, setColor, setShowPicker }) {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(color);
  }, [color]);

  return (
    <div className="native-color-inputs color-input-wrapper">
      <ColorIndicator onClick={setShowPicker} color={color} />
      <form
        onSubmit={e => {
          e.preventDefault();
          setColor(state);
        }}
      >
        <input
          pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          type="text"
          value={state}
          onChange={({ target }) => setState(target.value)}
        />
      </form>
    </div>
  );
}

export default ColorInput;
