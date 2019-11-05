import React from "react";
import { Text, Heading, Section, Flex, Container, Button } from "../Elements";
import Widget from "./Widget";

const textString =
  "Walk-in service is the norm, but clients can also make a reservation in advance.  Reservations are recommended for those wanting face and head shaves and coloring services. Clients can also check out individual stylist and barber schedules on our website.";
export default function Welcome(props) {
  return (
    <Widget {...props}>
      <Section bg="pageBackground" py={80} px={20}>
        <Container>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            maxWidth="75%"
            mx="auto"
          >
            <Heading level={2} textStyle="h2" mb={24}>
              Welcome
            </Heading>
            <Text textStyle="text" mb={32}>
              {textString}
            </Text>
            <Button variant="secondary">Services & Pricing</Button>
          </Flex>
        </Container>
      </Section>
    </Widget>
  );
}
