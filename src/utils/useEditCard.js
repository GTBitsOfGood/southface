import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { updateCardById, getCardById } from "../actions/Card";

const useEditCardModal = (
  cardTitle,
  cardComments,
  cardImages,
  cardTags,
  cardId
) => {
  const inputRef = React.createRef();
  const tagInputRef = useRef();
  const router = useRouter();

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
    inputRef.current.focus();
  };

  /*------------- ALL SUBMIT BUTTON METHODS -------------*/

  const applyEdit = async () => {
    const updatedCardInput = {
      images,
      title,
      comments,
      tags,
    };

    updateCardById(cardId, updatedCardInput).then((updatedCard) => {
      setIsEditing(!isEditing);
      setComments(updatedCard.comments);
      setTitle(updatedCard.title);
      setImages(updatedCard.images);
      setTags(updatedCard.tags);

      refreshData();
    });
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

  /*------------- MISC METHODS -------------*/

  /**
   * This method re-fetches the cards inside getServerSideProps.
   */
  const refreshData = () => {
    // router.replace(router.asPath); // if this doesn't work (comment and use the commented code below)
    router.reload();
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
    refreshData,
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
    inputRef,
    tagInputRef,
  };
};

export default useEditCardModal;
