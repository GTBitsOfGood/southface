import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useEditCardModal from "../../../lib/hooks/useEditCard";

import ModalImage from "../ModalImage";

import Carousel from "react-grid-carousel";

import styles from "./CardModal.module.css";

const CardModal = ({
  isOpen,
  onClose,
  cardTitle,
  cardDescription,
  cardComments,
  cardId,
  cardImages,
  cardTags,
  // setCards,
  ...rest
}) => {
  const unauthorizedToast = useToast();
  const {
    isEditing,
    title,
    // onEditCard,
    // comments,
    // setComments,
    // createNewComment,
    tags,
    images,
    // setAddingTag,
    // addingTag,
    // handleCommentsUpdate,
    handleTitleChange,
    // applyEdit,
    // onDeleteTag,
    // cancelEdit,
    // imageIsOpen,
    // imageOnOpen,
    // imageOnClose,
    setImages,
    // setTags,
  } = useEditCardModal(
    cardTitle,
    cardComments,
    cardImages,
    cardTags,
    cardId,
    unauthorizedToast
  );

  // const TagInput = (props) => {
  //   const [width, setWidth] = useState(0.5);
  //   const [editTagValue, setEditTagValue] = useState("");

  //   const handleTagChange = (e) => {
  //     setWidth(e.target.value.length);
  //     setEditTagValue(e.target.value);
  //   };

  //   const submitTagEdit = () => {
  //     if (editTagValue.length !== 0) {
  //       if (tags) {
  //         setTags([...tags, editTagValue]);
  //       } else {
  //         setTags([editTagValue]);
  //       }

  //       setAddingTag(!addingTag);
  //     }
  //   };

  //   return (
  //     <>
  //       <Input
  //         {...props}
  //         width={width + "ch"}
  //         minWidth="0.5ch"
  //         autoFocus
  //         onChange={handleTagChange}
  //       />

  //       <HStack display={props.display}>
  //         <IconButton
  //           icon={<CheckIcon />}
  //           onClick={submitTagEdit}
  //           size="xs"
  //           rounded="full"
  //         />
  //         <IconButton
  //           icon={<CloseIcon />}
  //           onClick={() => setAddingTag(false)}
  //           size="xs"
  //           rounded="full"
  //         />
  //       </HStack>
  //     </>
  //   );
  // };

  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <Modal
      {...rest}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: "2xl", lg: "4xl" }}
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
            {/* <Box display={{ base: isEditing ? "none" : "block", md: "block" }}>
              <RatingStars edit={false} value={4} />
            </Box> */}
          </Flex>
        </ModalHeader>

        <ModalBody mx={6}>
          <Flex flexDirection="column">
            {images.length > 0 ? (
              <Carousel
                cols={3}
                rows={1}
                // gap={10}
                responsiveLayout={[
                  {
                    breakpoint: 991,
                    cols: 2,
                  },
                ]}
                containerStyle={{ minHeight: "250px", margin: "0 -20px 20px" }}
                arrowLeft={
                  <ChevronLeftIcon
                    id={styles.cardModal__chevronLeft}
                    boxSize={12}
                  />
                }
                arrowRight={
                  <ChevronRightIcon
                    id={styles.cardModal__chevronRight}
                    boxSize={12}
                  />
                }
              >
                {images.map((image, index) => {
                  return (
                    <Carousel.Item
                      containerStyle={{ padding: "20px" }}
                      key={index}
                    >
                      <ModalImage
                        key={index}
                        floatRight={
                          windowWidth &&
                          windowWidth > 767 &&
                          windowWidth < 992 &&
                          index % 2 == 1
                        }
                        currentImageIndex={index}
                        image={image}
                        isEditing={isEditing}
                        setImages={setImages}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            ) : (
              <Flex id={styles.cardModal__noImagesText}>
                <Text>Add images for this standard!</Text>
              </Flex>
            )}

            <Text id={styles.cardModal__cardDescription}>
              {cardDescription}
            </Text>
            {/* <HStack spacing={5}>
              
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
            </HStack> */}
            <SimpleGrid mt={3} mb={15} columns={2}>
              <HStack flexWrap="wrap" gap={1}>
                {tags.map((tag, index) => {
                  return (
                    <Tag id={styles.cardModal__tag} key={index}>
                      {/* {isEditing && (
                        <TagLeftIcon
                          as={CloseIcon}
                          boxSize="9px"
                          onClick={() => onDeleteTag(index)}
                          _hover={{
                            cursor: "pointer",
                          }}
                        />
                      )} */}
                      {tag}
                    </Tag>
                  );
                })}

                {/* <TagInput
                  variant="unstyled"
                  display={addingTag ? "block" : "none"}
                  bgColor="#D9D9D9"
                  fontSize="sm"
                /> */}

                {/* {isEditing && !addingTag && (
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
                )} */}
              </HStack>
              <Flex gap={2} justifyContent="right">
                <Button
                  id={styles.cardModal__viewNotesBtn}
                  bgColor="white"
                  size="lg"
                  rounded={16}
                >
                  View Notes
                </Button>
                <Button
                  id={styles.cardModal__addToPlanBtn}
                  bgColor="#00ACC8"
                  size="lg"
                  rounded={16}
                >
                  Add to Plan
                </Button>
              </Flex>

              {/* {isEditing && comments.length === 0 ? (
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
              )} */}

              {/* {!isEditing ? (
                <Button
                  variant="link"
                  alignSelf="end"
                  color="#0065C1"
                  onClick={onEditCard}
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
  );
};
export default CardModal;
