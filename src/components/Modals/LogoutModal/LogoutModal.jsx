import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody textAlign="center" px={10} paddingTop={28}>
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" paddingBottom={20}>
          <Button variant="Grey-rounded" onClick={onClose} mr={3}>
            No, return to digital library
          </Button>
          <Button variant="Red-outlined-rounded" onClick={onLogout}>
            Yes, log out
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
