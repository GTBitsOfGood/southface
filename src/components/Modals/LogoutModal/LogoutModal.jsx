import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const LogoutModal = ({ isOpen, onClose, onLogout, currPage }) => {
  let confirmMessage;

  switch (currPage) {
    case "/add-standard":
      confirmMessage = "You have unsaved changes in Add a Standard";
      break;
    case "/report-builder":
      confirmMessage = "You have unsaved changes in the report builder";
      break;
    default:
      confirmMessage = "";
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent paddingBottom={10}>
        <Flex justifyContent="flex-end" padding={3}>
          <AiOutlineCloseCircle size={"1.5em"} onClick={onClose} />
        </Flex>
        <ModalBody textAlign="center" px={10} paddingTop={10} paddingBottom={5}>
          <Box>Are you sure you want to log out?</Box>
          <Box>{confirmMessage}</Box>
        </ModalBody>
        <ModalFooter display="flex" justifyContent="center" paddingBottom={5}>
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
