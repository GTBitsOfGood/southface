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
  Text,
  Flex,
  Tag,
  Input,
  HStack,
  IconButton,
  Heading,
  Box,
  TagLeftIcon,
  FormLabel,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

import RatingStars from "./RatingStars";
import ModifyImageModal from "../ModifyImageModal";
import ModalImage from "../ModalImage";

const CardModal = ({
  isOpen,
  onClose,
  isEditingFirst,
  cardTitle,
  cardBody,
  cardId,
  cardImages,
  cardTags,
  setCards,
  ...rest
}) => {
  const {
    isEditing,
    title,
    onEditCard,
    body,
    tags,
    images,
    setAddingTag,
    addingTag,
    handleBodyChange,
    handleTitleChange,
    inputRef,
    tagInputRef,
    applyEdit,
    onDeleteTag,
    cancelEdit,
    imageIsOpen,
    imageOnOpen,
    imageOnClose,
    setImages,
    setTags,
  } = useEditCardModal(cardTitle, cardBody, cardImages, cardTags, cardId);

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
          ref={tagInputRef}
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
            {isEditing ? (
              <Input
                size="lg"
                fontSize="lg"
                fontWeight="bold"
                width="md"
                onChange={handleTitleChange}
                mb={2}
                defaultValue={title}
                placeholder="Add Title"
              />
            ) : (
              <Heading mb={2}>{title}</Heading>
            )}
            <RatingStars edit={false} value={4} />
          </Flex>
          <HStack>
            {tags.map((tag, index) => {
              return (
                <Tag key={index} bgColor="#D9D9D9">
                  {isEditing && (
                    <TagLeftIcon
                      as={CloseIcon}
                      boxSize="9px"
                      onClick={() => onDeleteTag(index)}
                      _hover={{
                        cursor: "pointer",
                      }}
                    />
                  )}
                  {tag}
                </Tag>
              );
            })}

            <TagInput
              variant="unstyled"
              display={addingTag ? "block" : "none"}
              bgColor="#D9D9D9"
              fontSize="sm"
            />

            {isEditing && !addingTag && (
              <>
                {tags && tags.length === 0 && (
                  <FormLabel fontWeight="bold">Add Tags</FormLabel>
                )}
                <IconButton
                  icon={<AddIcon />}
                  size="xs"
                  rounded="full"
                  variant="link"
                  onClick={() => {
                    setAddingTag(!addingTag);
                    tagInputRef.current.focus();
                  }}
                />
              </>
            )}
          </HStack>
        </ModalHeader>

        <ModalBody mx={6}>
          <Flex flexDirection="column">
            <Flex justifyContent={"space-between"}>
              {images.map((image, index) => {
                return (
                  <ModalImage
                    key={index}
                    currentImageIndex={index}
                    image={image}
                    isEditing={isEditing}
                    setImages={setImages}
                  />
                );
              })}

              {isEditing && (
                <>
                  {images.length === 0 ? (
                    <Button onClick={imageOnOpen}>Add Image</Button>
                  ) : (
                    <IconButton
                      icon={<AddIcon />}
                      alignSelf="center"
                      rounded="full"
                      onClick={imageOnOpen}
                    />
                  )}

                  <ModifyImageModal
                    isOpen={imageIsOpen}
                    onClose={imageOnClose}
                    images={images}
                    setImages={setImages}
                    isAdd
                  />
                </>
              )}
            </Flex>
            <Flex mt={6} justifyContent="space-between">
              <Input
                flexBasis="sm"
                fontSize="sm"
                variant={isEditing ? "outline" : "unstyled"}
                isReadOnly={!isEditing}
                onChange={handleBodyChange}
                defaultValue={body}
                ref={inputRef}
                placeholder="Add Card Body"
              />

              <Button
                bgColor="#D9D9D9"
                alignSelf="end"
                size="lg"
                rounded={16}
              >
                Add to Plan
              </Button>
            </Flex>
            <Flex justifyContent="space-between" maxWidth="sm" my={3}>
              <Text fontSize="sm" fontWeight="bold">
                Commented on{" "}
                <Text as="span" color="#FFD600" fontWeight="bold">
                  Sept. 20. 2022
                </Text>
              </Text>

              {!isEditing ? (
                <Button
                  variant="link"
                  alignSelf="end"
                  color="#0065C1"
                  onClick={onEditCard}
                >
                  Edit
                </Button>
              ) : (
                <Box>
                  <HStack>
                    <IconButton
                      icon={<CheckIcon />}
                      onClick={applyEdit}
                      size="sm"
                      rounded="full"
                      bgColor="green"
                    />
                    <IconButton
                      icon={<CloseIcon />}
                      onClick={cancelEdit}
                      size="sm"
                      rounded="full"
                      bgColor="red"
                    />
                  </HStack>
                  <FormLabel fontWeight="bold">Apply/Cancel Edit</FormLabel>
                </Box>
              )}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CardModal;
