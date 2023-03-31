import { AddIcon, ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
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
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFormState } from "react-final-form";
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

  const [editing, setEditing] = useState(false);
  const { user } = useUser();

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

  // const {
  //   isOpen: isImageDeleteOpen,
  //   onOpen: onImageDeleteOpen,
  //   onClose: onImageDeleteClose,
  // } = useDisclosure();

  // const handleDeleteImage = (image) => {
  //   const index = card.images.indexOf(image);
  //   const newCardImages = JSON.parse(JSON.stringify(card.images));
  //   newCardImages.splice(index, 1);
  //   setValue("images", newCardImages);
  //   onImageDeleteClose();
  // };

  const form = useFormState();

  let discardChangesAndExit = () => {
    reset();
    setEditing(false);
    onDiscardChangesExitModalClose();
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
      <ModalContent rounded={14}>
        <ModalCloseButton right={2} top={0} m={4} />
        <ModalHeader mt={10} mx={6}>
          <Flex justifyContent="space-between">
            <Heading mb={2}>{card.title}</Heading>
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
                    width="auto"
                    onClick={onDiscardChangesOpen}
                  >
                    Discard Changes
                  </Button>
                  <Button
                    bgColor="#00ACC8"
                    rounded="3xl"
                    size="sm"
                    color="white"
                    width="auto"
                    _hover={{ bgColor: "#0690a7" }}
                    _active={{ bgColor: "#057b8f" }}
                    onClick={onSaveChangesOpen}
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
                {form.values?.images?.map(({ imageUrl: image }, index) => (
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
                        openImagePreviewCallback={openImagePreviewCallback}
                        showEnlarge={!editingReport}
                        setCurrentImage={setSelectedImage}
                        index={index}
                      />
                    </Box>
                  </Carousel.Item>
                ))}
                {editing ? (
                  <Carousel.Item>
                    <AddImageModal
                      setValue={setValue}
                      form={form}
                      cardId={card._id}
                    />
                  </Carousel.Item>
                ) : (
                  <></>
                )}
              </Carousel>
            </FormControl>
            {editing ? (
              <TextareaControl name="criteria" resize="none"></TextareaControl>
            ) : (
              <Text lineHeight="normal" fontSize="18px">
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
              <Flex flex={1} flexDirection="column" gap="1rem" width="full">
                <Wrap overflowY="hidden" overflowX="hidden">
                  {form.values?.tags
                    ? form.values.tags.map((tag, index) => (
                        <Box key={index} position="relative">
                          <Tag
                            bgColor="#c4d600"
                            borderRadius="30px"
                            minWidth="fill"
                            mt={editing ? "0.6rem" : "0rem"}
                            fontSize="1rem"
                            px="1rem"
                          >
                            {tag}
                          </Tag>
                          {editing ? (
                            <Button
                              position="absolute"
                              top="0.2rem"
                              right="-0.5rem"
                              backgroundColor="#FFFFFF"
                              color="#6D6E70"
                              boxShadow="0 0 0.5rem #b3b3b3"
                              size="xl"
                              height="max"
                              rounded="full"
                              p="0.3rem"
                              onClick={() => {
                                const existingTags = JSON.parse(
                                  JSON.stringify(form.values.tags)
                                );
                                existingTags.splice(index, 1);
                                setValue("tags", existingTags);
                              }}
                            >
                              <CloseIcon h={1.5} w={1.5} />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </Box>
                      ))
                    : ""}
                </Wrap>
                {editing ? (
                  <Flex
                    border="solid 1px #B4B4B4B4"
                    rounded="xl"
                    alignItems="center"
                    width="sm"
                  >
                    <InputControl
                      name="newTag"
                      type="text"
                      rounded="2xl"
                      border="none"
                      focusBorderColor="transparent"
                      placeholder="Add a Tag"
                      width="full"
                      onKeyDown={(e) => {
                        if (e.code == "Enter") {
                          if (form.values.newTag?.length > 0) {
                            const existingTags = JSON.parse(
                              JSON.stringify(form.values.tags)
                            )
                              ? JSON.parse(JSON.stringify(form.values.tags))
                              : [];
                            if (form.values?.newTag?.trim().length > 0) {
                              existingTags.push(form.values.newTag.trim());
                              setValue("newTag", "");
                              setValue("tags", existingTags);
                            }
                          }
                        }
                      }}
                    />
                    <Button
                      bgColor="transparent"
                      rounded="full"
                      width="max"
                      height="max"
                      p="0.2rem"
                      mr="1rem"
                      my="0.8rem"
                      size="xl"
                      border="solid 2px black"
                      _hover={{ bgColor: "#f0f0f0" }}
                      onClick={() => {
                        const existingTags = JSON.parse(
                          JSON.stringify(form.values.tags)
                        )
                          ? JSON.parse(JSON.stringify(form.values.tags))
                          : [];
                        if (form.values?.newTag?.trim().length > 0) {
                          existingTags.push(form.values.newTag.trim());
                          setValue("newTag", "");
                          setValue("tags", existingTags);
                        }
                      }}
                    >
                      <ArrowUpIcon h={4} w={4} color="black" />
                    </Button>
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
                    >
                      View Notes
                    </Button>
                    <Button
                      onClick={reportAddHandler}
                      variant="Blue-rounded"
                      size="lg"
                      isDisabled={user?.isLoggedIn ? false : true}
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
    </Modal>
  );
};

export default CardModal;
