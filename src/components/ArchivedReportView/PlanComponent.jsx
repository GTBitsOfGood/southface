import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const PlanComponent = ({ report }) => {
  return (
    <>
      <VStack alignItems="flex-start">
        <Heading fontSize=".75em">{report.name || "Untitled Report"}</Heading>
        <HStack>
          <Text fontSize=".75em">
            {report.cards.length} standard{report.cards.length !== 1 && "s"}
          </Text>
          <Box
            width="0.2rem"
            height="0.2rem"
            borderRadius="50%"
            border="1px solid black"
            background="black"
          ></Box>
          <Text fontSize=".75em">
            {report.cards.reduce((acc, { images }) => acc + images.length, 0)}{" "}
            images
          </Text>
        </HStack>
      </VStack>
    </>
  );
};

export default PlanComponent;
