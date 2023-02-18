import { Button, Flex, Text } from "@chakra-ui/react";
import LoadedStandards from "./LoadedStandards";

function RecentStandardsView(props) {
  return (
    <Flex>
      <Text>Recent Standards</Text>
      <Button
        h="30px"
        mt="3px"
        ml="30px"
        bgColor="#727474"
        borderRadius="20"
        textColor="white"
      >
        See All Standards
      </Button>
      <Flex gap="2px">
        <LoadedStandards standardsData={props.standardsData}></LoadedStandards>
      </Flex>
    </Flex>
  );
}

export default RecentStandardsView;
