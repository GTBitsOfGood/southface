import ConfirmActionModal from "../components/Modals/ConfirmActionModal";
import { Button, Box, Heading, useDisclosure } from "@chakra-ui/react";

const TestPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Heading>hey, my name is tawsif.</Heading>
      <Button onClick={onOpen}>confirm action</Button>
      <ConfirmActionModal
        isOpen={isOpen}
        onClose={onClose}
        mainText="Are you sure you want to delete this Image"
        subText="hello"
        confirmButtonText="Yes, Delete Image"
        cancelButtonText="No, Don't Delete"
      ></ConfirmActionModal>
    </Box>
  );
};

export default TestPage;
