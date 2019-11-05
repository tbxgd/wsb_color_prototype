import React, { useRef, useEffect, useState } from "react";

import uuid from "uuid";
import getColors from "image-pal-canvas";
import Color from "../Theme/themes/Color";

function compare(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

export default function ImageUpload({
  url,
  maxColors = 3,
  setImgColors,
  imgCallback = () => {},
  className,
  children
}) {
  const input = useRef(null);
  const id = useRef(uuid());
  const [imgUrl, setImgUrl] = useState(url);

  useEffect(() => {
    if (input.current) {
      getColors({ srcUrl: imgUrl, maxColors }, (err, colors) => {
        const arr = colors
          .sort((c1, c2) => {
            const { hue: hue1 } = new Color(c1.hex);
            const { hue: hue2 } = new Color(c2.hex);
            return compare(hue1, hue2);
          })
          .map(c => c.hex);
        setImgColors(arr);
      });
    }
  }, [setImgColors, imgUrl, maxColors]);

  useEffect(() => {
    imgCallback(imgUrl);
  }, [imgCallback, imgUrl]);

  return (
    <label htmlFor={id.current} className={`file-upload-wrapper ${className}`}>
      <input
        name="file-upload"
        id={id.current}
        className="file-input"
        type="file"
        ref={input}
        onChange={e => {
          setImgUrl(URL.createObjectURL(e.target.files[0]));
        }}
      />
      {children(imgUrl)}
    </label>
  );
}
