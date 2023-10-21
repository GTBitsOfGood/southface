import {
  Box,
  Button,
  CloseButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import { deleteBuildingTypeById } from "src/actions/BuildingType";
import BuildingTypeModal from "src/components/Modals/BuildingTypeModal";
import ConfirmActionModal from "src/components/Modals/ConfirmActionModal";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import { capitalizeAndRemoveDash } from "src/lib/utils/utilFunctions";
import useSWR from "swr";
import BuildingType from "../../components/BuildingTypeCard";
const LibraryPage = ({ initialBuildingTypes }) => {
  const {
    isOpen: isFirstDeleteModalOpen,
    onOpen: onFirstDeleteModalOpen,
    onClose: onFirstDeleteModalClose,
  } = useDisclosure();
  const {
    isOpen: isSecondDeleteModalOpen,
    onOpen: onSecondDeleteModalOpen,
    onClose: onSecondDeleteModalClose,
  } = useDisclosure();
  const [deleteMode, setDeleteMode] = useState(false);
  const { user } = useUser();
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const [buildingTypeToDelete, setBuildingTypeToDelete] = useState({
    name: "initialValue",
  });
  const { data, mutate } = useSWR(urls.api.buildingType.get, {
    // initialBuildingTypes,
    initialData: initialBuildingTypes,
  });
  const buildingTypes = data?.payload;
  const handleCreateModalClose = () => {
    mutate();
    onCreateModalClose();
  };
  const handleDeleteModalOpen = (buildingType) => {
    setBuildingTypeToDelete(buildingType);
    onSecondDeleteModalOpen();
  };
  const handleDeleteType = async () => {
    await deleteBuildingTypeById(buildingTypeToDelete._id);
    mutate();
    onSecondDeleteModalClose();
    setDeleteMode(false);
  };
  return (
    <>
      <Box height="78vh" paddingX="10vw" position="relative">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          height="40vw"
          width="full"
        >
          {buildingTypes &&
            buildingTypes.map((type) => (
              <Box key={type._id} position="relative">
                {deleteMode && (
                  <CloseButton
                    onClick={() => handleDeleteModalOpen(type)}
                    position="absolute"
                    top="0"
                    right="0"
                    bg="#D9D9D980"
                    rounded="full"
                    _hover={{ bg: "#D9D9D9B0" }}
                  ></CloseButton>
                )}
                <BuildingType
                  src={type.imageUrl}
                  alt={`${type.name} Icon`}
                  title={capitalizeAndRemoveDash(type.name)}
                  href={`library/${type.name}`}
                />
              </Box>
            ))}
        </Flex>
        {user?.isAdmin && (
          <Flex
            justifyContent="flex-end"
            position="absolute"
            bottom="0"
            right="5vw"
          >
            <Flex
              flexDirection="column"
              justifyContent="center"
              gap="1vh"
              padding="2vh"
            >
              <Button onClick={onCreateModalOpen} variant="Blue" size="lg">
                Create New Building Type
              </Button>
              <Button
                onClick={() => {
                  if (deleteMode) {
                    setDeleteMode(!deleteMode);
                    return;
                  }
                  onFirstDeleteModalOpen();
                }}
                variant={deleteMode ? "Grey" : "Red"}
                size="lg"
              >
                {deleteMode ? "Return to Home" : "Delete Building Type"}
              </Button>
            </Flex>
          </Flex>
        )}
      </Box>
      <BuildingTypeModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
      ></BuildingTypeModal>
      <ConfirmActionModal
        isOpen={isFirstDeleteModalOpen}
        onClose={onFirstDeleteModalClose}
        mainText="Are you sure you want to continue?"
        subText={`Deleting a building type will permanently delete the build type and the standards within the building type`}
        confirmButtonText="Yes, continue"
        cancelButtonText="No, return to home"
        handleAction={() => {
          setDeleteMode(!deleteMode);
          onFirstDeleteModalClose();
        }}
        handleCancelAction={onFirstDeleteModalClose}
        isDanger={true}
      ></ConfirmActionModal>
      <ConfirmActionModal
        isOpen={isSecondDeleteModalOpen}
        onClose={onSecondDeleteModalClose}
        mainText={`Are you sure you want to delete (${capitalizeAndRemoveDash(
          buildingTypeToDelete.name
        )})?`}
        subText="You will permanently delete this building type and will be unable to recover it."
        confirmButtonText="Yes, delete building type"
        cancelButtonText="No, return"
        handleAction={handleDeleteType}
        handleCancelAction={onSecondDeleteModalClose}
        isDanger={true}
      ></ConfirmActionModal>
    </>
  );
};

export async function getStaticProps() {
  const buildingTypes = await getBuildingTypes();
  return {
    props: {
      initialBuildingTypes: JSON.parse(JSON.stringify(buildingTypes)),
    },
  };
}

export default LibraryPage;
