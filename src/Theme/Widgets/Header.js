import React, { useState } from "react";
import {
  Background,
  Button,
  Heading,
  Flex,
  Container,
  Link
} from "../Elements";
import Widget from "./Widget";
import ImageUpload from "../../Editor/ImageUpload";

const imgUrlDefault =
  "https://img1.wsimg.com/isteam/ip/759cc48c-8ca0-4db4-9da3-3c653749aa98/logo/ccc5a9a6-1399-4adc-9370-f42191ddf726.webp/:/rs=h:344/ll";
function NavBar({ setImgColors, logoImg, setLogoImg }) {
  return (
    <Flex as="nav" py={24} justifyContent="space-between" alignItems="center">
      <Heading level={3} textStyle="h3" mb={24}>
        <ImageUpload
          url={logoImg}
          setImgColors={setImgColors}
          imgCallback={setLogoImg}
        >
          {imgUrl => {
            return (
              <img
                src={imgUrl || imgUrlDefault}
                alt=""
                style={{ maxWidth: "120px" }}
              />
            );
          }}
        </ImageUpload>
      </Heading>
      <Flex>
        <Link href="#" ml={24}>
          Home
        </Link>
        <Link href="#" ml={24}>
          About Us
        </Link>
        <Link href="#" ml={24}>
          Services
        </Link>
        <Link href="#" ml={24}>
          Contact
        </Link>
      </Flex>
    </Flex>
  );
}
export default function Header({
  logoImg,
  setLogoImg,
  setImgColors,
  setHeroColors,
  heroImg,
  setHeroImg,
  ...props
}) {
  return (
    <Widget {...props} overlay>
      <Background
        className="bg"
        heroImg={heroImg}
        backgroundImage={`linear-gradient(
          rgba(0,0,0,.12),
          rgba(0,0,0,.12)
        ),url('${heroImg}')`}
        backgroundSize="cover"
        setHeroColors={setHeroColors}
        setHeroImg={setHeroImg}
      >
        <Container>
          <NavBar
            logoImg={logoImg}
            setLogoImg={setLogoImg}
            setImgColors={setImgColors}
          />
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            minHeight="65vh"
          >
            <Heading level={1} textStyle="h1" mb={16}>
              Clean cut. Fresh look.
            </Heading>
            <Heading level={3} textStyle="h3" mb={24}>
              Never look better.
            </Heading>
            <Button pl={8 * 5} pr={8 * 5} mb={40} variant="primary">
              Check Availability
            </Button>
          </Flex>
        </Container>
      </Background>
    </Widget>
  );
}
