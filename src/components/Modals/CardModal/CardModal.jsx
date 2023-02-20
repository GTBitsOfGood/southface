import {
  AddIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import {
  // Box,
  Button,
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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Carousel from "react-grid-carousel";
import useEditCardModal from "../../../lib/hooks/useEditCard";
import ModalImage from "../ModalImage";
import ModifyImageModal from "../ModifyImageModal";
import ImagePreviewModal from "../ImagePreviewModal";

export const ChevronIcon = (props) => {
  const styles = {
    pos: "absolute",
    top: "0",
    bottom: "0",
    margin: "auto 0",
    color: "white",
    zIndex: 2,
    boxSize: 12,
  };
  if (props.orientation == "right") {
    return <ChevronRightIcon {...styles} right="20px" />;
  } else if (props.orientation == "left") {
    return <ChevronLeftIcon {...styles} left="20px" />;
  }
};

const CardModal = ({
  isOpenCardModal,
  onCloseCardModal,
  cardTitle,
  cardNotes,
  cardCriteria,
  cardId,
  cardImages,
  cardTags,
  setCards,
  ...rest
}) => {
  // not being used right now since admin view is not being worked on.
  const {
    isEditing,
    title,
    // onEditCard,
    tags,
    images,
    setAddingTag,
    addingTag,
    handleTitleChange,
    // applyEdit,
    onDeleteTag,
    // cancelEdit,
    imageIsOpen,
    imageOnOpen,
    imageOnClose,
    setImages,
    setTags,
  } = useEditCardModal(cardTitle, "placeholder", cardImages, cardTags, cardId);

  // const { ifAdmin } = useUser();

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
    isOpen: isOpenImagePreviewModal,
    onOpen: onOpenImagePreviewModal,
    onClose: onCloseImagePreviewModal,
  } = useDisclosure();

  const openImagePreviewCallback = () => {
    onCloseCardModal();
    onOpenImagePreviewModal();
  };

  return (
    <>
      <Modal
        {...rest}
        isOpen={isOpenCardModal}
        onClose={onCloseCardModal}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent rounded={14}>
          <ModalCloseButton right={2} top={0} m={4} />
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
            </Flex>
          </ModalHeader>

          <ModalBody mx={6}>
            <Flex flexDirection="column">
              {images.length > 0 ? (
                <Carousel
                  cols={3}
                  rows={1}
                  gap={10}
                  responsiveLayout={[
                    {
                      breakpoint: 991,
                      cols: 2,
                    },
                  ]}
                  containerStyle={{
                    minHeight: "250px",
                    margin: "0 -20px 20px",
                  }}
                  arrowLeft={<ChevronIcon orientation="left" />}
                  arrowRight={<ChevronIcon orientation="right" />}
                >
                  {images.map((image, index) => {
                    return (
                      <Carousel.Item
                        containerStyle={{ padding: "20px" }}
                        key={index}
                      >
                        <ModalImage
                          key={index}
                          index={index}
                          currentImageIndex={index}
                          image={image}
                          isEditing={isEditing}
                          setImages={setImages}
                          openImagePreviewCallback={openImagePreviewCallback}
                        />
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
              ) : (
                <Flex
                  minHeight="250px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text>Add images for this standard!</Text>
                </Flex>
              )}

              <Text lineHeight="normal" fontSize="18px">
                {cardCriteria}
              </Text>
              <HStack spacing={5}>
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
              </HStack>
              <SimpleGrid mt={3} mb={15} columns={2}>
                <HStack flexWrap="wrap" gap={1}>
                  {tags.map((tag, index) => {
                    return (
                      <Tag bgColor="#c4d600" borderRadius="30px" key={index}>
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
                <Flex gap={2} justifyContent="right">
                  <Button
                    bgColor="white"
                    size="lg"
                    rounded={16}
                    color="#6d6e70"
                    border="solid 1px #6d6e70"
                    fontSize={{ lg: "22px", md: "16px", base: "12px" }}
                    width="auto"
                    onClick={openImagePreviewCallback}
                  >
                    View Notes
                  </Button>
                  <Button
                    bgColor="#00ACC8"
                    size="lg"
                    rounded={16}
                    color="white"
                    fontSize={{ lg: "22px", md: "16px", base: "12px" }}
                    width="auto"
                    _hover={{ bgColor: "#0690a7" }}
                    _active={{ bgColor: "#057b8f" }}
                  >
                    Add to Plan
                  </Button>
                </Flex>

                {/* {!isEditing ? (
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
              )} */}
              </SimpleGrid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ImagePreviewModal
        isOpen={isOpenImagePreviewModal}
        onClose={onCloseImagePreviewModal}
        cardId={cardId}
        cardImages={cardImages}
        cardNotes={cardNotes}
        setCards={setCards}
      />
    </>
  );
};
export default CardModal;
