import React from "react";
import uuid from "uuid";
import {
  Base,
  Text,
  Heading,
  Section,
  Flex,
  Container,
  Grid,
  Image,
  Button
} from "../Elements";
import Widget from "./Widget";

const data = [
  `https://source.unsplash.com/featured/?haircut,salon,men`,
  `https://source.unsplash.com/featured/?haircut,salon,woman`,
  `https://source.unsplash.com/featured/?barber,salon`
];

const dataTitles = [`Shave & Cut`, `Waxing`, `All Services`];

const textStrings = [
  `Best value for Mid-ear and Longer Length haircuts. Includes haircut with our signature massage shampoo and full style.`,
  `Specialty designs carved into haircut with clippers, trimmers, or straight razor. Consult with Barber or Stylist for pricing.`,
  `We offer a full menu of services, including cuts, color, shaves, and signature shampoo, finishing every service with a shoulder massage.`
];

export default function About(props) {
  return (
    <Widget {...props}>
      <Section bg="pageBackground" py={80} px={20}>
        <Container>
          <Grid gridTemplateColumns="1fr 1fr 1fr" gridGap="2em">
            {data.map((img, i) => (
              <Flex key={i} flexDirection="column" justifyContent="center">
                <Image treatment="cover" height={200} mb={24} src={img} />
                <Heading level={4} textStyle="h4" mb={24}>
                  {dataTitles[i]}
                </Heading>
                <Text textStyle="text">{textStrings[i]}</Text>
                <Base mt={24}>
                  <Button variant="secondary">Learn More</Button>
                </Base>
              </Flex>
            ))}
          </Grid>
        </Container>
      </Section>
    </Widget>
  );
}
