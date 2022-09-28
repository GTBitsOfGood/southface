import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  useTheme,
} from "@chakra-ui/react";

const CardModal = ({
  isOpen,
  onClose,
  ...rest
}) => {
  const theme = useTheme();
  return (
      <Modal {...rest} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sample Header</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Body</ModalBody>

        <ModalFooter>
          <Button
            bgColor={theme.colors.darkBlue}
            color="white"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CardModal;
