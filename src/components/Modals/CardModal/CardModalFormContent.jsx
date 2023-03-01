import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
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
import { useState } from "react";
import { useFormState } from "react-final-form";
import useUser from "../../../lib/hooks/useUser";
import ArrowIcon from "../../Carousel/ArrowIcon";
import Carousel from "../../Carousel/Carousel";
import InputControl from "../../FormComponents/InputControl";
import TextareaControl from "../../FormComponents/TextareaControl";
import ImagePreviewModal from "../ImagePreviewModal";
import ModalImage from "../ModalImage";
import AddImageModal from "./AddImageModal";
import ConfirmActionsModal from "./ConfirmActionModal";

const CardModalFormContent = ({
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

  const {
    isOpen: isImageDeleteOpen,
    onOpen: onImageDeleteOpen,
    onClose: onImageDeleteClose,
  } = useDisclosure();

  const [editing, setEditing] = useState(false);
  const { user } = useUser();

  const openImagePreviewCallback = () => {
    onOpenImagePreviewModal();
  };

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

  const handleDeleteImage = (image) => {
    const index = card.images.indexOf(image);
    card.images.splice(index, 1);
    onImageDeleteClose();
  };

  const form = useFormState();
  registerField("tags", () => {}, {
    // ...other subscription items
    touched: true,
  });

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
        reset();
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
            <Carousel
              cols={3}
              rows={1}
              gap={10}
              containerStyle={{
                marginBottom: "1.5rem",
              }}
              arrowLeft={<ArrowIcon orientation="left" />}
              arrowRight={<ArrowIcon orientation="right" />}
            >
              {card.images.map(({ imageUrl: image }, index) => (
                <Carousel.Item key={index}>
                  <ModalImage
                    editing={editing}
                    image={image}
                    openImagePreviewCallback={openImagePreviewCallback}
                    onImageDeleteOpen={onImageDeleteOpen}
                    isImageDeleteOpen={isImageDeleteOpen}
                    onImageDeleteClose={onImageDeleteClose}
                    handleDeleteImage={handleDeleteImage}
                  />
                </Carousel.Item>
              ))}
              {editing ? (
                <Carousel.Item>
                  <AddImageModal />
                </Carousel.Item>
              ) : (
                <></>
              )}
            </Carousel>
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
              <Flex flexDirection="column" gap="1rem" width="full">
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
                            existingTags.push(form.values.newTag.trim());
                            setValue("newTag", "");
                            setValue("tags", existingTags);
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
                        existingTags.push(form.values.newTag.trim());
                        setValue("newTag", "");
                        setValue("tags", existingTags);
                      }}
                    >
                      <ArrowUpIcon h={4} w={4} color="black" />
                    </Button>
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
              <Flex gap={2} justifyContent="right" width="max">
                {editing ? (
                  <Button
                    bgColor="#B90000"
                    rounded="3xl"
                    size="sm"
                    color="#FFFFFF"
                    border="solid 2px #FFFFFF"
                    width="auto"
                    _hover={{ border: "solid 2px #B90000" }}
                    _active={{ bgColor: "#B90000" }}
                    onClick={onDeleteStandardOpen}
                  >
                    Delete Standard
                  </Button>
                ) : (
                  <>
                    <Button
                      bgColor="white"
                      rounded="3xl"
                      size="sm"
                      color="#6d6e70"
                      border="solid 1px #6d6e70"
                      width="auto"
                      onClick={openImagePreviewCallback}
                    >
                      View Notes
                    </Button>
                    <Button
                      bgColor="#00ACC8"
                      rounded="3xl"
                      size="sm"
                      color="white"
                      width="auto"
                      _hover={{ bgColor: "#0690a7" }}
                      _active={{ bgColor: "#057b8f" }}
                    >
                      Add to Report
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

export default CardModalFormContent;
