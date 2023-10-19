import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import BuildingTypeModal from "src/components/Modals/BuildingTypeModal";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import { capitalizeAndRemoveDash } from "src/lib/utils/utilFunctions";
import useSWR from "swr";
import BuildingType from "../../components/BuildingTypeCard";
const LibraryPage = () => {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, mutate } = useSWR(urls.api.buildingType.get);
  const buildingTypes = data?.payload;
  const handleModalClose = () => {
    mutate();
    onClose();
  };
  return (
    <Flex>
      <Flex justifyContent="center" height="78vh" paddingX="10vw">
        <Flex justifyContent="space-between" height="40vw" width="full">
          {buildingTypes &&
            buildingTypes.map((type) => (
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
        {user?.isAdmin ? (
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
        ) : null}
      </Flex>
      <BuildingTypeModal
        isOpen={isOpen}
        onClose={handleModalClose}
      ></BuildingTypeModal>
    </Flex>
  );
};

export default LibraryPage;
