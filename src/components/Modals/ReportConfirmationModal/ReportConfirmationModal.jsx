import {
  Button,
  Center,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ReportConfirmationModal(props) {
  const { onClose, isOpen, handleSave, handleDiscard } = { ...props };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>End Report</ModalHeader>
        <ModalCloseButton />
        <Center m="25%" fontSize="xl">
          Do you want to save this report before marking it as complete?
        </Center>
        <HStack justify="space-evenly" p={3}>
          <Button onClick={handleSave}>Yes, save report</Button>
          <Button onClick={handleDiscard}>No, discard report</Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
}
