import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

const DeleteModal = ({
  isOpen,
  onClose,
  modalBody,
  headerText,
  closeText,
  submitText,
  onSubmit,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{ base: "md", xl: "lg", "2xl": "xl" }}
    >
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalHeader
          pt={10}
          display="flex"
          justifyContent="center"
          fontSize="lg"
        >
          {headerText}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          {modalBody}
        </ModalBody>

        <ModalFooter justifyContent="center" pb={10}>
          <ButtonGroup>
            <Button
              bgColor="white"
              size="sm"
              rounded={16}
              color="#6d6e70"
              border="solid 1px #6d6e70"
              fontSize="md"
              width="auto"
              onClick={onClose}
            >
              {closeText}
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              rounded={16}
              fontSize="md"
              width="auto"
              onClick={onSubmit}
            >
              {submitText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
