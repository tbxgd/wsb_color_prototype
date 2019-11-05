import React from "react";
import { StyledBackground } from "./Styled";
import { Text } from "./Text";
import { useTheme } from "../";
import ImageUpload from "../../Editor/ImageUpload";

export function Background({
  setHeroColors,
  heroImg,
  setHeroImg,
  children,
  ...props
}) {
  const theme = useTheme();
  return (
    <StyledBackground position="relative" theme={theme} {...props}>
      {children}
      <ImageUpload
        maxColors={4}
        url={heroImg}
        imgCallback={setHeroImg}
        className="update-btn"
        setImgColors={setHeroColors}
      >
        {() => {
          return <Text textStyle="text">Update Cover Image</Text>;
        }}
      </ImageUpload>
    </StyledBackground>
  );
}
