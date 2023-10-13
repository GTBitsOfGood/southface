import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import BuildingTypeModal from "src/components/Modals/BuildingTypeModal";
import useUser from "src/lib/hooks/useUser";
import { capitalizeAndRemoveDash } from "src/lib/utils/utilFunctions";
import BuildingType from "../../components/BuildingTypeCard";

const LibraryPage = ({ buildingTypes }) => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
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
      <Flex justifyContent="flex-end" position="relative" marginTop="2vh">
        <Button
          onClick={onOpen}
          position="absolute" // position the button
          bottom="5vh" // space from the bottom
          right="5vw" // space from the right
          variant="Blue-rounded"
          size="lg"
          isDisabled={user?.isAdmin ? false : true}
        >
          Create New Building Type
        </Button>
      </Flex>
      <BuildingTypeModal isOpen={isOpen} onClose={onClose}></BuildingTypeModal>
    </>
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
