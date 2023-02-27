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

const ArchivedReportCard = ({ report = defaultReportProps }) => {
  const [hasReportCard, setHasReportCard] = useState(true);

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
            <Box display="flex" alignItems="center">
              <Heading size="xl">Recent Report</Heading>
              <Button as="a" variant="Grey-rounded" marginLeft="15">
                Download
              </Button>
              <Button as="a" variant="Red-rounded" marginLeft="15">
                Print to PDF
              </Button>
            </Box>
            <Box>
              <Button onClick={handleRemove} variant="Red-rounded">
                Remove from Reports
              </Button>
            </Box>
          </CardHeader>
          <CardBody>
            <Flex justifyContent="space-between" marginRight="15em">
              {report.cards.map((card, index) => (
                <Flex key={index}>
                  <StandardCard
                    title={card.title}
                    images={card.images}
                    criteria={card.criteria}
                  />
                  {index < report.cards.length - 1 && (
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
