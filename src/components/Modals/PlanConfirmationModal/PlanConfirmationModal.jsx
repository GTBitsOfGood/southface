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

export default function PlanConfirmationModal(props) {
  const { onClose, isOpen, handleSave, handleDiscard } = { ...props };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>End Project Plan</ModalHeader>
        <ModalCloseButton />
        <Center m="25%" fontSize="xl">
          Do you want to save this project plan before marking it as complete?
        </Center>
        <HStack justify="space-evenly" p={3}>
          <Button onClick={handleSave}>Yes, save project plan</Button>
          <Button onClick={handleDiscard}>No, discard project plan</Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
}
