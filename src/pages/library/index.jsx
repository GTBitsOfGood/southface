import { Flex } from "@chakra-ui/react";
import BuildingType from "../../components/BuildingTypeCard";

const LibraryPage = () => {
  return (
    <Flex justifyContent="center" height="78vh" paddingX="10vw">
      <Flex justifyContent="space-between" height="40vw" width="full">
        <BuildingType
          src="/static/MultiFamilyIcon.png"
          alt="MultiFamily Icon"
          title="Multifamily"
          href="library/multifamily"
        />
        <BuildingType
          src="/static/SingleFamilyIcon.png"
          alt="SinglyFamily Icon"
          title="Single Family"
          href="library/single-family"
        />
        <BuildingType
          src="/static/CommercialIcon.png"
          alt="Commerical Icon"
          title="Commerical"
          href="library/commercial"
        />
      </Flex>
    </Flex>
  );
};

export default LibraryPage;
