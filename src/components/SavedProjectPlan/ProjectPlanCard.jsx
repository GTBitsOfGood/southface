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
import React, { useState } from "react";
import StandardCard from "./StandardCard";
import StandardCardDefaultProps from "./StandardCardDefaultProps";

const ProjectPlanCard = () => {
  const [hasProjectPlanCard, setHasProjectPlanCard] = useState(true);

  const defaultPropsArray = Array(3).fill(StandardCardDefaultProps);

  const handleRemove = () => {
    setHasProjectPlanCard(false);
  };

  return (
    hasProjectPlanCard && (
      <Flex>
        <Card boxShadow="md" p="6" rounded="mlgd" bg="white" marginBottom="10">
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
                onClick={handleRemove}
              >
                Remove from Saved Project Plans
              </Button>
            </Box>
          </CardHeader>
          <CardBody>
            <Flex justifyContent="space-between" marginRight="15em">
              {defaultPropsArray.map((defaultProps, index) => (
                <Flex key={index}>
                  <StandardCard
                    title={`Standard ${index + 1}`}
                    imageUrl={defaultProps.imageUrl}
                    criteria={defaultProps.criteria}
                  />
                  {index < defaultPropsArray.length - 1 && (
                    <Divider orientation="vertical" />
                  )}
                </Flex>
              ))}
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    )
  );
};

export default ProjectPlanCard;
