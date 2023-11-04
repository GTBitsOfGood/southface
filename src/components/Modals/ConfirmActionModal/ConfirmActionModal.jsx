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
  handleCancelAction = null,
  isDanger = false,
  children,
  ...rest
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered={true}
    size="lg"
    {...rest}
  >
    <ModalOverlay />
    <ModalContent rounded={14} display="flex" fontFamily="Europa-Regular">
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
            variant={isDanger ? "Grey-rounded" : "Grey-outlined-rounded"}
            size="sm"
            fontSize="md"
            width="auto"
            fontWeight="700"
            fontFamily="Europa-Bold"
            onClick={handleCancelAction ? handleCancelAction : onClose}
          >
            {cancelButtonText}
          </Button>
          <Button
            variant={isDanger ? "Red-outlined-rounded" : "Blue-rounded"}
            size="sm"
            fontSize="md"
            width="auto"
            fontWeight="700"
            fontFamily="Europa-Bold"
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
