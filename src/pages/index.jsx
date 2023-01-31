import { Flex } from "@chakra-ui/react";
import BuildingType from "../components/BuildingTypeCard";

const IndexPage = () => {
  return (
    <Flex justifyContent="center" height="40vh" paddingX="10vw">
      <Flex justifyContent="space-between" height="40vw" width="full">
        <BuildingType
          src="/static/MultifamilyIcon.png"
          alt="MultiFamily Icon"
          title="Multifamily"
        />
        <BuildingType
          src="/static/SingleFamilyIcon.png"
          alt="SinglyFamily Icon"
          title="Single Family"
        />
        <BuildingType
          src="/static/CommercialIcon.png"
          alt="Commerical Icon"
          title="Commerical"
        />
      </Flex>
    </Flex>
  );
};

export default IndexPage;
