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

const DiscardChangesModal = ({
  isOpen,
  onClose,
  prompt,
  subcontent,
  confirmActionText,
  abandonActionText,
  handleDiscardChanges,
  colorScheme = "blue",
}) => {
  const colorSchemeProperties = {};
  if (colorScheme == "blue") {
    colorSchemeProperties.confirm = {
      bgColor: "white",
      color: "#6d6e70",
    };
    colorSchemeProperties.abandon = {
      bgColor: "#00ACC8",
      color: "white",
      _hover: { bgColor: "#0690a7" },
      _active: { bgColor: "#057b8f" },
    };
  } else if (colorScheme == "red") {
    colorSchemeProperties.confirm = {
      bgColor: "white",
      color: "#6d6e70",
    };
    colorSchemeProperties.abandon = {
      bgColor: "#B90000",
      color: "white",
      _hover: { border: "solid 2px #B90000" },
      _active: { bgColor: "#B90000" },
      border: "solid 2px #FFFFFF",
    };
  } else {
    throw new Error("Color scheme does not exist for ConfirmActionModal");
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalHeader
          pt={10}
          display="flex"
          justifyContent="center"
          textAlign="center"
          fontSize="2xl"
        >
          {prompt}
        </ModalHeader>
        <ModalCloseButton />
        {subcontent ? (
          <ModalBody display="flex" justifyContent="center" textAlign="center">
            <Text>{subcontent}</Text>
          </ModalBody>
        ) : (
          <></>
        )}

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
              {confirmActionText}
            </Button>
            <Button
              {...colorSchemeProperties.abandon}
              size="sm"
              rounded={16}
              fontSize="md"
              width="auto"
              onClick={handleDiscardChanges}
            >
              {abandonActionText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DiscardChangesModal;
