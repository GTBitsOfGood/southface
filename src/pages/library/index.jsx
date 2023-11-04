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
    <Flex direction="column">
      <Flex justifyContent="center" paddingX="10vw">
        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          height={{ base: "full", md: "40vw" }}
          width={{ base: "40vw", md: "full" }}
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
      </Flex>
      
      <Flex justifyContent="center" position="relative" marginTop="2vh">
        {user?.isAdmin && (
          <Button onClick={onOpen} variant="Blue-rounded" size="lg">
            Create New Building Type
          </Button>
        )}
      </Flex>

      <BuildingTypeModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
      ></BuildingTypeModal>
    </Flex>

  );
};

export async function getStaticProps() {
  const buildingTypes = await getBuildingTypes();
  return {
    props: {
      initialBuildingTypes: JSON.parse(JSON.stringify(buildingTypes)),
    },
    revalidate: 10,
  };
}

export default LibraryPage;
