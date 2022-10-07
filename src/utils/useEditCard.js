import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { updateCardById, getCardById } from "../actions/Card";

const useEditCardModal = (
  cardTitle,
  cardBody,
  cardImages,
  cardTags,
  cardId
) => {
  const inputRef = useRef();
  const tagInputRef = useRef();
  const router = useRouter();

  const {
    isOpen: imageIsOpen,
    onOpen: imageOnOpen,
    onClose: imageOnClose,
  } = useDisclosure();

  const [body, setBody] = useState(cardBody);
  const [title, setTitle] = useState(cardTitle);
  const [images, setImages] = useState(cardImages);
  const [tags, setTags] = useState(cardTags);

  const [isEditing, setIsEditing] = useState(false);
  const [addingTag, setAddingTag] = useState(false);

  /*------------- ALL INPUT HANDLING METHODS -------------*/

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
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
      body,
      tags,
    };

    updateCardById(cardId, updatedCardInput).then((updatedCard) => {
      console.log(updatedCard);
      setIsEditing(!isEditing);
      setBody(updatedCard.body);
      setTitle(updatedCard.title);
      setImages(updatedCard.images);
      setTags(updatedCard.tags);

      refreshData();
    });
  };

  const cancelEdit = async () => {
    const card = await getCardById(cardId);
    console.log(card);
    setIsEditing(!isEditing);
    setAddingTag(false);
    setBody(card.body);
    setTitle(card.title);
    setImages(card.images);
    setTags(card.tags);
  };

  /*------------- MISC METHODS -------------*/

  /**
   * This method re-fetches the cards inside getServerSideProps.
   */
  const refreshData = () => {
    console.log("is this working");
    // router.replace(router.asPath); This is not working (best option since page does not refresh)
    router.reload();
  };

  return {
    handleTitleChange,
    handleBodyChange,
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
    setBody,
    setAddingTag,
    setIsEditing,
    title,
    images,
    tags,
    body,
    addingTag,
    isEditing,
    inputRef,
    tagInputRef,
  };
};

export default useEditCardModal;
