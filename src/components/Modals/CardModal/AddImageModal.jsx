import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";

const AddImageModal = ({ ...props }) => {
  const {
    // isOpen: isImageOpen,
    onOpen: onImageOpen,
    // onClose: onImageClose,
  } = useDisclosure();

  return (
    <>
      <Box position="relative" {...props} width="full" height="full">
        <Box width="full" height="full">
          <Button
            justifyContent="center"
            alignItems="center"
            boxShadow="lg"
            width="full"
            height="calc(100% - .5rem)"
            bgColor="white"
            _hover={{ bgColor: "#ededed" }}
            onClick={onImageOpen}
          >
            <Box padding="1.5rem" rounded="full" bgColor="#6D6E70">
              <AddIcon boxSize="2.5rem" color="white" />
            </Box>
          </Button>
        </Box>
      </Box>
      {/* <ModifyImageModal isOpen={isImageOpen} onClose={onImageClose} /> */}
    </>
  );
};

export default AddImageModal;
