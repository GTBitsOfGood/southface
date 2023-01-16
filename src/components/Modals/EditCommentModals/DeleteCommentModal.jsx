import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { updateCardById } from "../../../actions/Card";

const DeleteCommentModal = ({
  isOpen,
  onClose,
  cardId,
  comments,
  currCommentIdx,
  setComments,
  setCurrCommentIdx,
  setCards,
}) => {
  const unauthorizedToast = useToast();
  const handleDeleteComment = async () => {
    try {
      const newComments = comments.filter((_, idx) => idx !== currCommentIdx);

      const updatedCard = await updateCardById(cardId, {
        comments: newComments,
      });

      setComments(newComments);
      setCurrCommentIdx((currCommentIdx) => currCommentIdx - 1);
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
      if (
        error.message === "Unauthorized" ||
        error.message === "Not Logged In"
      ) {
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
        <ModalHeader>Delete Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Are you sure you want to delete:</Text>
          <Text fontSize="sm">{`"${comments[currCommentIdx].body}"`}</Text>
          <Text fontSize="sm">
            {`-- Commented on ${" "}`}
            <Text as="span" color="#FFD600" fontWeight="bold">
              {new Date(comments[currCommentIdx].date).toDateString()}
            </Text>
          </Text>
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
            onClick={handleDeleteComment}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCommentModal;
