import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import urls from "lib/utils/urls";
import { useEffect, useState } from "react";
import { useFormState } from "react-final-form";
import useSWR from "swr";
import useActiveReport from "../../../lib/hooks/useActiveReport";
import useUser from "../../../lib/hooks/useUser";
import ArrowIcon from "../../Carousel/ArrowIcon";
import Carousel from "../../Carousel/Carousel";
import InputControl from "../../FormComponents/InputControl";
import TextareaControl from "../../FormComponents/TextareaControl";
import ImagePreviewModal from "../ImagePreviewModal";
import ModalImage from "../ModalImage";
import AddImageModal from "./AddImageModal";
import ConfirmActionsModal from "./ConfirmActionModal";

const CardModal = ({
  card,
  setCards,
  isOpenCardModal,
  onCloseCardModal,
  setValue,
  reset,
  handleSubmit,
  registerField,
  handleDeleteStandard,
  setImagesToDelete,
  ...rest
}) => {
  const {
    isOpen: isOpenImagePreviewModal,
    onOpen: onOpenImagePreviewModal,
    onClose: onCloseImagePreviewModal,
  } = useDisclosure();

  const {
    isOpen: isDiscardChangesOpen,
    onOpen: onDiscardChangesOpen,
    onClose: onDiscardChangesClose,
  } = useDisclosure();

  const {
    isOpen: isDiscardChangesExitModelOpen,
    onOpen: onDiscardChangesExitModalOpen,
    onClose: onDiscardChangesExitModalClose,
  } = useDisclosure();

  const {
    isOpen: isSaveChangesOpen,
    onOpen: onSaveChangesOpen,
    onClose: onSaveChangesClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteStandardOpen,
    onOpen: onDeleteStandardOpen,
    onClose: onDeleteStandardClose,
  } = useDisclosure();

  const {
    isOpen: isTagDoesNotExistOpen,
    onOpen: onTagDoesNotExistOpen,
    onClose: onTagDoesNotExistClose,
  } = useDisclosure();

  const [editing, setEditing] = useState(false);
  const { user } = useUser();

  const { data } = useSWR(urls.api.tag.getObject);
  const dbTags = data?.payload[0];
  const tagsList = useSWR(urls.api.tag.getTags).data?.payload;
  const [autocompleteTags, setAutocompleteTags] = useState([]);
  const [editingTags, setEditingTags] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  // Start of report selection code
  const { changeInReport, addToReport } = useActiveReport();
  const { selState } = { ...rest };
  const imgArr = (function () {
    if (selState && selState.imgSelections.length === card.images.length) {
      return selState.imgSelections;
    } else {
      return Array(card.images.length).fill(true);
    }
  })();

  const { selected = false } = { ...rest };

  const reportAddHandler = () => {
    if (!selected) {
      addToReport(card);
    } else {
      setEditingReport((prev) => !prev);
    }
  };
  const [editingReport, setEditingReport] = useState(false);
  useEffect(() => {
    if (!selected) {
      setEditingReport(false);
    }
  }, [editingReport, selected]);

  const openImagePreviewCallback = () => {
    setEditingReport(false);
    onOpenImagePreviewModal();
    // if (isOpenCardModal) {
    //   onCloseCardModal();
    // }
  };

  const imgToggleHandler = (index) => () => {
    if (selState && editingReport) {
      imgArr[index] = !imgArr[index];
      const newSel = { ...selState };
      newSel.imgSelections = imgArr;
      changeInReport(newSel);
    }
  };

  useEffect(() => {
    if (editing) {
      setEditingReport(false);
    }
  }, [editing]);

  // End of report selection code

  useEffect(() => {
    registerField("tags", () => {}, {
      // ...other subscription items
      touched: true,
    });
    registerField("images", () => {}, {
      // ...other subscription items
      touched: true,
    });
  }, [registerField]);

  const discardChanges = () => {
    reset();
    setEditing(false);
    onDiscardChangesClose();
  };

  const saveChanges = () => {
    setEditing(false);
    handleSubmit();
    onSaveChangesClose();
    onCloseCardModal();
  };

  const deleteStandard = () => {
    setEditing(false);
    handleDeleteStandard();
    onDeleteStandardClose();
    onCloseCardModal();
  };

  const handleDeleteImage = (image, onDeleteImageClose) => {
    const newCardImages = form?.values?.images?.filter((imageFromArray) => {
      if (image != imageFromArray.imageUrl) {
        return image;
      }
    });
    setValue("images", newCardImages);
    setImagesToDelete((imagesToDelete) => [...imagesToDelete, image]);
    onDeleteImageClose();
  };

  const addNewTag = () => {
    const existingTags = JSON.parse(JSON.stringify(form.values.tags))
      ? JSON.parse(JSON.stringify(form.values.tags))
      : [];
    existingTags.push(form.values.newTag.trim());
    setValue("newTag", "");
    setValue("tags", existingTags);
    setEditingTags(false);
  };

  const selectAutocompleteTag = (name) => {
    form.values.newTag = name;
    validateNewTag();
  };

  const validateNewTag = () => {
    if (form.values.tags.includes(form.values?.newTag)) {
      setValue("newTag", "");
      return;
    }
    if (form.values?.newTag?.trim().length > 0) {
      const firstLetter = form.values.newTag.charAt(0).toLowerCase();
      if (dbTags[firstLetter]) {
        const foundTag = dbTags[firstLetter].find(
          (obj) => obj.name === form.values.newTag
        );
        foundTag ? addNewTag() : onTagDoesNotExistOpen();
      } else {
        onTagDoesNotExistOpen();
      }
    }
  };

  const moveImage = (index, direction) => {
    const newImages = [...form.values.images];
    const thisImg = newImages[index];
    const swapImg = newImages[index + direction];

    newImages[index] = swapImg;
    newImages[index + direction] = thisImg;

    setValue("images", newImages);
  };

  const form = useFormState();

  let discardChangesAndExit = () => {
    reset();
    setEditing(false);
    onDiscardChangesExitModalClose();
    setImagesToDelete([]);
    onCloseCardModal();
  };

  return (
    <Modal
      {...rest}
      isOpen={isOpenCardModal}
      onClose={() => {
        if (editing && form.dirty) {
          onDiscardChangesExitModalOpen();
        } else {
          setEditing(false);
          onCloseCardModal();
        }
      }}
      size={{ base: "xs", md: "2xl", lg: "4xl" }}
    >
      <ModalOverlay />
      <ModalContent rounded={14} fontFamily="'Europa-Regular', sans-serif">
        <ModalCloseButton right={2} top={0} m={4} />
        <ModalHeader mt={10} mx={6}>
          <Flex
            justifyContent="space-between"
            align={editing ? "center" : "start"}
            gap={4}
          >
            {editing ? (
              <InputControl name="title" size="lg"></InputControl>
            ) : (
              <Heading mb={2} fontFamily="'Roboto Slab', serif" color="#515254">
                {card.title}
              </Heading>
            )}
            {user?.isAdmin ? (
              !editing ? (
                <Button
                  bgColor="black"
                  size="sm"
                  p="1em"
                  rounded="3xl"
                  color="#ffffff"
                  border="solid 2px #ffffff"
                  width="auto"
                  _hover={{ border: "solid 2px #6d6e70" }}
                  onClick={() => {
                    setEditing(true);
                  }}
                >
                  Edit
                </Button>
              ) : (
                <Flex gap={2} justifyContent="right">
                  <Button
                    bgColor="white"
                    rounded="3xl"
                    size="sm"
                    color="#6d6e70"
                    border="solid 1px #6d6e70"
                    whiteSpace="nowrap"
                    width="auto"
                    onClick={onDiscardChangesOpen}
                    fontFamily="Europa-Bold"
                  >
                    Discard Changes
                  </Button>
                  <Button
                    bgColor="#00ACC8"
                    rounded="3xl"
                    size="sm"
                    color="white"
                    whiteSpace="nowrap"
                    width="auto"
                    _hover={{ bgColor: "#0690a7" }}
                    _active={{ bgColor: "#057b8f" }}
                    onClick={onSaveChangesOpen}
                    isDisabled={form.hasValidationErrors}
                    fontFamily="Europa-Bold"
                  >
                    Save Changes
                  </Button>
                </Flex>
              )
            ) : (
              <></>
            )}
          </Flex>
        </ModalHeader>

        <ModalBody mx={6}>
          <Flex flexDirection="column">
            <FormControl
              isInvalid={() => form?.values?.images.length == 0}
              marginBottom="1.5rem"
            >
              {form?.values?.images?.length == 0 ? (
                <FormErrorMessage marginLeft="8px">
                  {form?.errors?.images}
                </FormErrorMessage>
              ) : (
                <></>
              )}
              <Carousel
                cols={3}
                rows={1}
                gap={10}
                containerStyle={{
                  border: `${
                    form?.values?.images?.length == 0 ? "2px solid #E53E3E" : ""
                  }`,
                  padding: "0.3rem",
                  "border-radius": "1rem",
                }}
                arrowLeft={<ArrowIcon orientation="left" />}
                arrowRight={<ArrowIcon orientation="right" />}
              >
                {form.values?.images?.map(({ imageUrl: image }, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <Box position="relative">
                        {editingReport && (
                          <Circle
                            position="absolute"
                            bottom="10px"
                            bgColor="blue.500"
                            color="white"
                            right="10px"
                            zIndex={5}
                            padding={2}
                          >
                            {selState?.imgSelections[index] ? (
                              <CloseIcon />
                            ) : (
                              <AddIcon />
                            )}
                          </Circle>
                        )}
                        <ModalImage
                          onClick={imgToggleHandler(index)}
                          borderWidth={
                            selState?.imgSelections[index] && editingReport
                              ? "5px"
                              : "0px"
                          }
                          borderColor={
                            selState?.imgSelections[index] && editingReport
                              ? "blue.500"
                              : "none"
                          }
                          cursor={editingReport ? "pointer" : "default"}
                          image={image}
                          move={(direction) => moveImage(index, direction)}
                          imageCount={form.values.images.length}
                          openImagePreviewCallback={openImagePreviewCallback}
                          showEnlarge={!editingReport}
                          setCurrentImage={setSelectedImage}
                          index={index}
                          editing={editing}
                          handleDeleteImage={handleDeleteImage}
                        />
                      </Box>
                    </Carousel.Item>
                  );
                })}
                {editing ? (
                  <Carousel.Item>
                    <AddImageModal setValue={setValue} form={form} />
                  </Carousel.Item>
                ) : (
                  <></>
                )}
              </Carousel>
            </FormControl>
            {editing ? (
              <TextareaControl name="criteria" resize="none"></TextareaControl>
            ) : (
              <Text
                lineHeight="normal"
                maxH="8em"
                overflow="scroll"
                fontSize="18px"
              >
                {card.criteria}
              </Text>
            )}
            <Flex
              mt={3}
              mb={15}
              flexDirection="row"
              gap="1rem"
              alignItems="end"
              width="full"
            >
              <Flex flex={1} width="50%" flexDirection="column" gap="1rem">
                <Flex
                  flexShrink={0}
                  overflow="scroll"
                  flexWrap={editing ? "wrap" : "nowrap"}
                >
                  {form.values?.tags
                    ? form.values.tags.map((tag, index) => (
                        <Box
                          key={index}
                          position="relative"
                          marginRight="0.5rem"
                        >
                          <Tag
                            bgColor="#E2E3E5"
                            borderRadius="30px"
                            minWidth="fill"
                            textTransform="capitalize"
                            mt={editing ? "0.6rem" : "0rem"}
                            fontSize="1rem"
                            px="1rem"
                            whiteSpace="nowrap"
                            mx="4px"
                            color="#515254"
                          >
                            {tag}
                          </Tag>
                          {editing ? (
                            <Button
                              position="absolute"
                              mt="0.6rem"
                              right="-0.3rem"
                              borderLeftRadius="none"
                              backgroundColor="#E2E3E5"
                              color="none"
                              size="xs"
                              rounded="full"
                              _hover={{ bg: "#E2E3E5" }}
                              onClick={() => {
                                const existingTags = JSON.parse(
                                  JSON.stringify(form.values.tags)
                                );
                                existingTags.splice(index, 1);
                                setValue("tags", existingTags);
                              }}
                            >
                              <CloseIcon h={1.5} w={1.5} color="#515254" />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Box>
                      ))
                    : ""}
                  {editing && !editingTags && (
                    <Box position="relative" marginRight="0.5rem">
                      <Button
                        bgColor="#E2E3E5"
                        borderRadius="30px"
                        minWidth="fill"
                        textTransform="capitalize"
                        mt="0.6rem"
                        fontSize="1rem"
                        px="1rem"
                        whiteSpace="nowrap"
                        mx="4px"
                        size="xs"
                        color="#515254"
                        _hover={{ bg: "#515254", color: "#E2E3E5" }}
                        onClick={() => setEditingTags(true)}
                      >
                        + Add
                      </Button>
                    </Box>
                  )}
                </Flex>
                {editing && editingTags ? (
                  <Flex
                    border="solid 1px #B4B4B4B4"
                    rounded="xl"
                    alignItems="center"
                    width="sm"
                    direction="column"
                  >
                    <Box width="100%" display="inline-flex">
                      <InputControl
                        name="newTag"
                        type="text"
                        rounded="2xl"
                        border="none"
                        focusBorderColor="transparent"
                        placeholder="Add a Tag"
                        width="full"
                        onKeyUp={(e) => {
                          setAutocompleteTags(
                            tagsList.filter(
                              (tag) => tag.name.indexOf(form.values.newTag) == 0
                            )
                          );
                          if (e.code == "Enter") {
                            if (form.values.newTag?.length > 0) {
                              validateNewTag();
                            }
                          }
                        }}
                      />
                      <Button
                        mt="0.6rem"
                        backgroundColor="transparent"
                        color="none"
                        size="xs"
                        rounded="full"
                        _hover={{ bg: "#E2E3E5" }}
                        marginRight="0.5rem"
                        onClick={() => setEditingTags(false)}
                      >
                        <CloseIcon h={1.5} w={1.5} color="#515254" />
                      </Button>
                    </Box>
                    {form.values.newTag &&
                    !tagsList
                      .map((tag) => tag.name)
                      .includes(form.values.newTag) ? (
                      <Button
                        width="full"
                        backgroundColor="transparent"
                        color="#515254"
                        justifyContent="left"
                        textTransform="none"
                        rounded="none"
                        borderTop="1px solid #B4B4B4B4"
                        size="md"
                        _hover={{ bg: "#E2E3E5" }}
                        onClick={validateNewTag}
                      >
                        <b>
                          <i>
                            Add &quot;{form.values.newTag}&quot; as a new tag
                          </i>
                        </b>
                      </Button>
                    ) : (
                      <></>
                    )}
                    {form.values.newTag &&
                      autocompleteTags.map((tag, i) => {
                        return (
                          <Button
                            key={i}
                            width="full"
                            backgroundColor="transparent"
                            color="#515254"
                            justifyContent="left"
                            rounded="none"
                            borderTop="1px solid #B4B4B4B4"
                            borderBottomRadius={
                              i == autocompleteTags.length - 1 ? "xl" : "none"
                            }
                            size="md"
                            _hover={{ bg: "#E2E3E5" }}
                            onClick={() => selectAutocompleteTag(tag.name)}
                          >
                            {tag.name}
                          </Button>
                        );
                      })}
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
              <Flex flex={1} gap={2} justifyContent="right" width="max">
                {editing ? (
                  <Button
                    variant="Red"
                    size="lg"
                    onClick={onDeleteStandardOpen}
                    fontFamily="Europa-Bold"
                  >
                    Delete Standard
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="Grey-outlined-rounded"
                      size="lg"
                      onClick={() => {
                        setSelectedImage(0);
                        openImagePreviewCallback();
                      }}
                      fontFamily="Europa-Bold"
                    >
                      View Notes
                    </Button>
                    <Button
                      onClick={reportAddHandler}
                      variant="Blue-rounded"
                      size="lg"
                      isDisabled={user?.isLoggedIn ? false : true}
                      fontFamily="Europa-Bold"
                    >
                      {!selected
                        ? "Add to Report"
                        : editingReport
                        ? "Save changes"
                        : "Edit In Report"}
                    </Button>
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
      <ImagePreviewModal
        isOpen={isOpenImagePreviewModal}
        onClose={onCloseImagePreviewModal}
        card={card}
        setCards={setCards}
        selState={selState}
        currentImageIndex={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <ConfirmActionsModal
        isOpen={isDiscardChangesOpen}
        onClose={onDiscardChangesClose}
        handleAction={discardChanges}
        prompt="Are you sure you want to discard all changes?"
        subcontent="All progress will be lost."
        confirmActionText="Yes, discard changes"
        abandonActionText="No, return to edit"
      />
      <ConfirmActionsModal
        isOpen={isDiscardChangesExitModelOpen}
        onClose={onDiscardChangesExitModalClose}
        handleAction={() => {
          discardChangesAndExit();
        }}
        prompt="Are you sure you want to discard all changes?"
        subcontent="All progress will be lost."
        confirmActionText="Yes, discard changes"
        abandonActionText="No, return to edit"
      />
      <ConfirmActionsModal
        isOpen={isSaveChangesOpen}
        onClose={onSaveChangesClose}
        handleAction={saveChanges}
        prompt="Are you sure you want to save all changes?"
        confirmActionText="Yes, save changes"
        abandonActionText="No, return to edit"
      />
      <ConfirmActionsModal
        isOpen={isDeleteStandardOpen}
        onClose={onDeleteStandardClose}
        handleAction={deleteStandard}
        prompt={`Are you sure you want to delete ${card.title}?`}
        subcontent="You will be unable to recover it after it has been deleted."
        confirmActionText="Yes, delete standard"
        abandonActionText="No, return to edit"
        colorScheme="red"
      />
      <ConfirmActionsModal
        isOpen={isTagDoesNotExistOpen}
        onClose={onTagDoesNotExistClose}
        handleAction={() => {
          addNewTag();
          onTagDoesNotExistClose();
        }}
        subcontent={`"${form.values.newTag}" doesn't currently exist as a tag. Would you like to create it?`}
        confirmActionText="Yes, create tag."
        abandonActionText="No, return to edit."
      />
    </Modal>
  );
};

export default CardModal;
