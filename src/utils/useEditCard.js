import { computeSha256Hmac } from "@azure/core-util";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState } from "react";
import { updateCardById, getCardById } from "../actions/Card";

const useEditCardModal = (
  cardTitle,
  cardComments,
  cardImages,
  cardTags,
  cardId,
  unauthorizedToast
) => {
  const {
    isOpen: imageIsOpen,
    onOpen: imageOnOpen,
    onClose: imageOnClose,
  } = useDisclosure();

  const [comments, setComments] = useState(cardComments);
  const [newComment, setNewComment] = useState({ body: "", date: "" });
  const [title, setTitle] = useState(cardTitle);
  const [images, setImages] = useState(cardImages);
  const [tags, setTags] = useState(cardTags);

  const [isEditing, setIsEditing] = useState(false);
  const [addingTag, setAddingTag] = useState(false);

  /*------------- ALL INPUT HANDLING METHODS -------------*/

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCommentsUpdate = (e, id) => {
    const newComments = comments.map((c) => {
      if (c._id === id) {
        c.body = e.target.value;
        c.date = new Date();
      }
      return c;
    });
    setComments(newComments);
  };

  const createNewComment = (e) => {
    setNewComment([{ body: e.target.value, date: new Date() }]);
  };

  const onDeleteTag = (currentTagIndex) => {
    setTags((tags) => {
      return tags.filter((_, index) => index !== currentTagIndex);
    });
  };

  const onEditCard = async () => {
    setIsEditing(!isEditing);
  };

  /*------------- ALL SUBMIT BUTTON METHODS -------------*/

  const applyEdit = async (setCards) => {
    try {
      const updatedCardInput = {
        images,
        title,
        comments: comments.length === 0 ? newComment : comments,
        tags,
      };

      const updatedCard = await updateCardById(cardId, updatedCardInput);

      
      setIsEditing(!isEditing);
      setComments(updatedCard.comments);
      setTitle(updatedCard.title);
      setImages(updatedCard.images);
      setTags(updatedCard.tags);

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
      if (error.message === "Not Logged In" || error.message === "Unauthorized") {
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
  };

  const cancelEdit = async () => {
    const card = await getCardById(cardId);
    setIsEditing(!isEditing);
    setAddingTag(false);
    setComments(card.comments);
    setTitle(card.title);
    setImages(card.images);
    setTags(card.tags);
  };

  return {
    handleTitleChange,
    handleCommentsUpdate,
    createNewComment,
    applyEdit,
    cancelEdit,
    onEditCard,
    onDeleteTag,
    imageIsOpen,
    imageOnClose,
    imageOnOpen,
    setTitle,
    setImages,
    setTags,
    setNewComment,
    setComments,
    setAddingTag,
    setIsEditing,
    title,
    images,
    tags,
    comments,
    newComment,
    addingTag,
    isEditing,
  };
};

export default useEditCardModal;
