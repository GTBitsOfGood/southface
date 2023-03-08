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
        <ModalBody textAlign="center">
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter>
          <Button variant="Grey" onClick={onClose}>
            No, return to digital library
          </Button>
          <Button variant="Red" onClick={onLogout} ml={3}>
            Yes, log out
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
