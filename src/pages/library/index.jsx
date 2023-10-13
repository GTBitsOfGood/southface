import { Flex } from "@chakra-ui/react";
import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import { capitalizeAndRemoveDash } from "src/lib/utils/utilFunctions";
import BuildingType from "../../components/BuildingTypeCard";

const LibraryPage = ({ buildingTypes }) => {
  return (
    <Flex justifyContent="center" height="78vh" paddingX="10vw">
      <Flex justifyContent="space-between" height="40vw" width="full">
        {buildingTypes.map((type) => (
          <BuildingType
            key={type._id}
            src={type.imageUrl}
            alt={`${type.name} Icon`}
            title={capitalizeAndRemoveDash(type.name)}
            href={`library/${type.name}`}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export async function getStaticProps() {
  const buildingTypes = await getBuildingTypes();
  return {
    props: {
      buildingTypes: JSON.parse(JSON.stringify(buildingTypes)),
    },
  };
}
export default LibraryPage;
