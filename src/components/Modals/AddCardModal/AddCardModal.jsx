import { useState } from "react";
import useEditCardModal from "../../../utils/useEditCard";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Modal,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Tag,
  Input,
  HStack,
  IconButton,
  Box,
  TagLeftIcon,
  FormLabel,
} from "@chakra-ui/react";

import { createCard } from "../../../actions/Card";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import ModifyImageModal from "../ModifyImageModal";
import ModalImage from "../ModalImage";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const AddCardModal = ({ isOpen, onClose, setCards, ...rest }) => {
  const {
    handleTitleChange,
    createNewComment,
    onDeleteTag,
    imageIsOpen,
    imageOnOpen,
    imageOnClose,
    setTitle,
    setImages,
    setTags,
    setComments,
    setAddingTag,
    title,
    images,
    tags,
    newComment,
    addingTag,
  } = useEditCardModal();

  const unauthorizedToast = useToast();

  const addCard = async () => {
    try {
      const addCardInput = {
        images,
        title,
        comments: newComment,
        tags,
      };
      const newCard = await createCard(addCardInput);
      setComments([]);
      setTitle("");
      setImages([]);
      setTags([]);
      setCards((cards) => [newCard, ...cards]);

      onClose();
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

  const TagInput = (props) => {
    const [width, setWidth] = useState(0.5);
    const [editTagValue, setEditTagValue] = useState("");

    const handleTagChange = (e) => {
      setWidth(e.target.value.length);
      setEditTagValue(e.target.value);
    };

    const submitTagEdit = () => {
      if (editTagValue.length !== 0) {
        if (tags) {
          setTags([...tags, editTagValue]);
        } else {
          setTags([editTagValue]);
        }

        setAddingTag(!addingTag);
      }
    };

    return (
      <>
        <Input
          {...props}
          width={width + "ch"}
          minWidth="0.5ch"
          autoFocus
          onChange={handleTagChange}
        />

        <HStack display={props.display}>
          <IconButton
            icon={<CheckIcon />}
            onClick={submitTagEdit}
            size="xs"
            rounded="full"
          />
          <IconButton
            icon={<CloseIcon />}
            onClick={() => setAddingTag(false)}
            size="xs"
            rounded="full"
          />
        </HStack>
      </>
    );
  };

  return (
    <Modal {...rest} isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />
      <ModalContent rounded={14}>
        <ModalCloseButton
          size="sm"
          border="2px solid black"
          left={0}
          top={0}
          rounded="full"
          m={4}
        />
        <ModalHeader mt={10} mx={6}>
          <Flex justifyContent="space-between">
            <Input
              size="lg"
              fontSize="lg"
              fontWeight="bold"
              width="md"
              autoFocus
              onChange={handleTitleChange}
              mb={2}
              placeholder="Add Title"
            />
          </Flex>
          <HStack>
            {tags && tags.length !== 0 ? (
              tags.map((tag, index) => {
                return (
                  <Tag key={index} bgColor="#D9D9D9">
                    <TagLeftIcon
                      as={CloseIcon}
                      boxSize="9px"
                      onClick={() => onDeleteTag(index)}
                      _hover={{
                        cursor: "pointer",
                      }}
                    />
                    {tag}
                  </Tag>
                );
              })
            ) : (
              <FormLabel mt={1}>Add Tags</FormLabel>
            )}

            <TagInput
              variant="unstyled"
              display={addingTag ? "block" : "none"}
              bgColor="#D9D9D9"
              fontSize="sm"
            />

            {!addingTag && (
              <IconButton
                icon={<AddIcon />}
                size="xs"
                rounded="full"
                variant="link"
                onClick={() => setAddingTag(!addingTag)}
              />
            )}
          </HStack>
        </ModalHeader>

        <ModalBody mx={6}>
          <Flex flexDirection="column">
            <Flex justifyContent={"start"}>
              {images && images.length !== 0 ? (
                images.map((image, index) => {
                  return (
                    <ModalImage
                      key={index}
                      currentImageIndex={index}
                      image={image}
                      isEditing={true}
                      setImages={setImages}
                    />
                  );
                })
              ) : (
                <FormLabel mt={1}>Add Images</FormLabel>
              )}

              <IconButton
                icon={<AddIcon />}
                alignSelf="center"
                rounded="full"
                onClick={imageOnOpen}
              />
              <ModifyImageModal
                isOpen={imageIsOpen}
                onClose={imageOnClose}
                images={images}
                setImages={setImages}
                isAdd
              />
            </Flex>
            <Flex mt={6} justifyContent="space-between">
              <Input
                flexBasis="sm"
                fontSize="sm"
                onChange={createNewComment}
                placeholder="Add Card Comment"
              />

              <Button bgColor="#D9D9D9" alignSelf="end" size="lg" rounded={16}>
                Add to Plan
              </Button>
            </Flex>
            <Flex justifyContent="space-between" maxWidth="sm" my={3}>
              <Box>
                <HStack>
                  <IconButton
                    icon={<CheckIcon />}
                    onClick={addCard}
                    size="sm"
                    rounded="full"
                    bgColor="green"
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={onClose}
                    size="sm"
                    rounded="full"
                    bgColor="red"
                  />
                </HStack>
                <FormLabel fontWeight="bold">Add Card/Cancel</FormLabel>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddCardModal;
