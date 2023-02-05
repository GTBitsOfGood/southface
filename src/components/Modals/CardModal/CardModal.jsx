import { AddIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  TagLeftIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import useEditCardModal from "../../../lib/hooks/useEditCard";

import useUser from "src/lib/hooks/useUser";
import Comments from "../../Comments/Comments";
import ModalImage from "../ModalImage";
import ModifyImageModal from "../ModifyImageModal";
import RatingStars from "./RatingStars";

const CardModal = ({
  isOpen,
  onClose,
  cardTitle,
  cardComments,
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
    comments,
    setComments,
    createNewComment,
    tags,
    images,
    setAddingTag,
    addingTag,
    handleCommentsUpdate,
    handleTitleChange,
    applyEdit,
    onDeleteTag,
    cancelEdit,
    imageIsOpen,
    imageOnOpen,
    imageOnClose,
    setImages,
    setTags,
  } = useEditCardModal(cardTitle, cardComments, cardImages, cardTags, cardId);

  const { ifAdmin } = useUser();

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

  const {
    AddToPlanButton = (
      <Button bgColor="#D9D9D9" alignSelf="end" size="lg" rounded={16}>
        Add to Plan
      </Button>
    ),
  } = { ...rest };
  return (
    <Modal
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: "2xl", lg: "4xl" }}
    >
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
                autoFocus
                onChange={handleTitleChange}
                mb={2}
                defaultValue={title}
                placeholder="Add Title"
              />
            ) : (
              <Heading mb={2}>{title}</Heading>
            )}
            <Box display={{ base: isEditing ? "none" : "block", md: "block" }}>
              <RatingStars edit={false} value={4} />
            </Box>
          </Flex>
          <HStack flexWrap="wrap" gap={2}>
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
                    cardId={cardId}
                  />
                </>
              )}
            </Flex>
            <SimpleGrid
              mt={6}
              mb={15}
              columns={3}
              justifyContent="space-between"
            >
              {isEditing && comments.length === 0 ? (
                <Input
                  flexBasis="sm"
                  fontSize="sm"
                  onChange={createNewComment}
                  placeholder="Add Card Comment"
                />
              ) : (
                <Comments
                  isEditing={isEditing}
                  comments={comments}
                  handleCommentsUpdate={handleCommentsUpdate}
                  cardId={cardId}
                  setComments={setComments}
                  setCards={setCards}
                />
              )}

              {!isEditing ? (
                <Button
                  variant="link"
                  alignSelf="end"
                  color="#0065C1"
                  onClick={() => ifAdmin(onEditCard)}
                >
                  Edit
                </Button>
              ) : (
                <Center>
                  <Box>
                    <HStack>
                      <IconButton
                        icon={<CheckIcon />}
                        onClick={() => applyEdit(setCards)}
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
                </Center>
              )}
              {AddToPlanButton}
            </SimpleGrid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default CardModal;
