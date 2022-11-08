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
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { updateCardById } from "../../../actions/Card";
import { useRouter } from "next/router";

const AddCommentModal = ({ isOpen, onClose, cardId, comments }) => {
  const [newComment, setNewComment] = useState({ body: "", date: "" });

  const router = useRouter();

  const handleChange = (e) => {
    setNewComment({ body: e.target.value, date: new Date() });
  };

  const handleAddComment = async () => {
    const newComments = comments.concat(newComment);
    await updateCardById(cardId, { comments: newComments });

    // router.replace(router.asPath); // if this doesn't work, then comment it out and use the code below
    router.reload();

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
