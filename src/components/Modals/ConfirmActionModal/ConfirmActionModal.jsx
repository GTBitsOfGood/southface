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
  Text,
} from "@chakra-ui/react";

const ConfirmActionModal = ({
  isOpen,
  onClose,
  mainText,
  subText,
  confirmButtonText,
  cancelButtonText,
  handleAction,
  isDanger = false,
  children,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="lg">
    <ModalOverlay />
    <ModalContent rounded={14} display="flex">
      <ModalHeader
        pt={10}
        display="flex"
        justifyContent="center"
        textAlign="center"
        fontSize="xl"
      >
        {mainText}
      </ModalHeader>
      <ModalCloseButton />
      {subText ? (
        <ModalBody
          display="flex"
          justifyContent="center"
          textAlign="center"
          flexDirection="column"
          alignSelf="center"
        >
          {children}
          <Text>{subText}</Text>
        </ModalBody>
      ) : (
        <></>
      )}

      <ModalFooter justifyContent="center" pb={10}>
        <ButtonGroup>
          <Button
            variant="Grey-outlined"
            size="sm"
            rounded={16}
            fontSize="md"
            width="auto"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant={isDanger ? "Red" : "Blue"}
            size="sm"
            rounded={16}
            fontSize="md"
            width="auto"
            onClick={handleAction}
          >
            {confirmButtonText}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default ConfirmActionModal;
