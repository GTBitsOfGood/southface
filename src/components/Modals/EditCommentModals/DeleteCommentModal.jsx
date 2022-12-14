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
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { updateCardById } from "../../../actions/Card";
import { useRouter } from "next/router";

const DeleteCommentModal = ({
  isOpen,
  onClose,
  cardId,
  comments,
  currCommentIdx,
}) => {
  const router = useRouter();

  const handleDeleteComment = async () => {
    const newComments = comments.filter((_, idx) => idx !== currCommentIdx);

    await updateCardById(cardId, { comments: newComments });

    router.reload();

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
