import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  Button,
  Image,
  Text,
  Flex,
  ModalFooter,
  useTheme,
} from "@chakra-ui/react";

const CardModal = ({
  isOpen,
  onClose,
  headerValue,
  description,
  image,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Modal {...rest} isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerValue}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column">
            <Image src={image} maxHeight="md"/>
            <Text>{description}</Text>
          </Flex>
        </ModalBody>

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
