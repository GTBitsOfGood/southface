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
import defaultReportProps from "./defaultReportProps";
import StandardCard from "./StandardCard";

const ArchivedReportCard = ({ report }) => {
  const [hasReportCard, setHasReportCard] = useState(true);
  const reportState = report || defaultReportProps;

  const handleRemove = () => {
    setHasReportCard(false);
  };

  return (
    hasReportCard && (
      <Flex>
        <Card
          boxShadow="md"
          p="6"
          rounded="mlgd"
          bg="white"
          marginBottom="10"
          flex="1"
        >
          <CardHeader display="flex" justifyContent="space-between">
            <Box display="flex">
              <Heading size="xl">Recent Report</Heading>
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
                Remove from Reports
              </Button>
            </Box>
          </CardHeader>
          <CardBody>
            <Flex justifyContent="space-between" marginRight="15em">
              {reportState.cards.map((card, index) => (
                <Flex key={index}>
                  <StandardCard
                    title={card.title}
                    images={card.images}
                    criteria={card.criteria}
                  />
                  {index < reportState.cards.length - 1 && (
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

export default ArchivedReportCard;
