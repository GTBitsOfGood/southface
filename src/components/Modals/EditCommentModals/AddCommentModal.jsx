import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormLabel,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { updateCardById } from "../../../actions/Card";

const AddCommentModal = ({
  isOpen,
  onClose,
  cardId,
  comments,
  setComments,
  setCurrCommentIdx,
  setCards,
}) => {
  const [newComment, setNewComment] = useState({ body: "", date: "" });

  const unauthorizedToast = useToast();

  const handleChange = (e) => {
    setNewComment({ body: e.target.value, date: new Date() });
  };

  const handleAddComment = async () => {
    try {
      const newComments = comments.concat(newComment);
      const updatedCard = await updateCardById(cardId, {
        comments: newComments,
      });

      setComments(newComments);
      setCurrCommentIdx((currCommentIdx) => currCommentIdx + 1);

      setCards((cards) => {
        return cards.map((card) => {
          if (cardId === card._id) {
            return updatedCard;
          } else {
            return card;
          }
        });
      });
    } catch (error) {
      if (error.message === "Unauthorized") {
        unauthorizedToast({
          title: "Unauthorized!",
          description: "You must log in as an admin.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw error;
      }
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>Add Comment</FormLabel>
          <Input onChange={handleChange} />
        </ModalBody>

        <ModalFooter>
          <IconButton
            icon={<CloseIcon />}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          />
          <IconButton
            icon={<CheckIcon />}
            colorScheme="blue"
            mr={3}
            onClick={handleAddComment}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddCommentModal;
