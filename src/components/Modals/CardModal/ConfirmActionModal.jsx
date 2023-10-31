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

const ConfirmActionModal = ({
  isOpen,
  onClose,
  prompt,
  subcontent,
  confirmActionText,
  abandonActionText,
  handleAction,
  colorScheme = "blue",
}) => {
  const colorSchemeProperties = {};
  if (colorScheme == "blue") {
    colorSchemeProperties.abandon = {
      bgColor: "white",
      color: "#6d6e70",
      border: "solid 1px #6d6e70",
    };
    colorSchemeProperties.confirm = {
      bgColor: "#00ACC8",
      color: "white",
      _hover: { bgColor: "#0690a7" },
      _active: { bgColor: "#057b8f" },
    };
  } else if (colorScheme == "red") {
    colorSchemeProperties.abandon = {
      bgColor: "white",
      color: "#6d6e70",
      border: "solid 1px #6d6e70",
    };
    colorSchemeProperties.confirm = {
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
      <ModalContent rounded={14} fontFamily="Europa-Regular">
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
            {subcontent}
          </ModalBody>
        ) : (
          <></>
        )}

        <ModalFooter justifyContent="center" pb={10}>
          <ButtonGroup>
            <Button
              {...colorSchemeProperties.abandon}
              size="sm"
              rounded={16}
              fontSize="md"
              width="auto"
              onClick={onClose}
              fontFamily="Europa-Bold"
            >
              {abandonActionText}
            </Button>
            <Button
              {...colorSchemeProperties.confirm}
              size="sm"
              rounded={16}
              fontSize="md"
              width="auto"
              onClick={handleAction}
              fontFamily="Europa-Bold"
            >
              {confirmActionText}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmActionModal;
