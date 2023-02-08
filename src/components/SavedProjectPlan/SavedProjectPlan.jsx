import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import StandardCard from "./StandardCard";

const SavedProjectPlan = () => {
  return (
    <Flex>
      <Card border="1px" size="sm">
        <CardHeader display="flex" justifyContent="space-between">
          <Box display="flex">
            <Heading size="xl">Recent Project Plan</Heading>
            <Button
              as="a"
              background="#6D6E70"
              borderRadius="3xl"
              color="white"
              marginLeft="15"
            >
              Download
            </Button>
            <Button
              as="a"
              background="#6D6E70"
              borderRadius="3xl"
              color="white"
              marginLeft="15"
            >
              Print to PDF
            </Button>
          </Box>
          <Box>
            <Button
              as="a"
              background="#B90000"
              borderRadius="3xl"
              color="white"
            >
              Remove from Saved Project Plans
            </Button>
          </Box>
        </CardHeader>
        <CardBody>
          <Flex justifyContent="space-between">
            <StandardCard />
            <Divider orientation="vertical" />
            <StandardCard />
            <Divider orientation="vertical" />
            <StandardCard />
            <Divider orientation="vertical" />
            <StandardCard />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  );
};

export default SavedProjectPlan;
