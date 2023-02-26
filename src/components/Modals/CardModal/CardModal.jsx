import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Form } from "react-final-form";
import useUser from "../../../lib/hooks/useUser";
import ArrowIcon from "../../Carousel/ArrowIcon";
import Carousel from "../../Carousel/Carousel";
import ImagePreviewModal from "../ImagePreviewModal";
import ModalImage from "../ModalImage";
import cardEditValidator from "./cardEditValidator";
import ConfirmActionsModal from "./ConfirmActionModal";

const CardModal = ({
  card,
  isOpenCardModal,
  onCloseCardModal,
  setCards,
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
    onCloseCardModal();
    onOpenImagePreviewModal();
  };

  const editSubmit = async () => {};

  const discardChanges = () => {
    setEditing(false);
    onDiscardChangesClose();
  };

  const saveChanges = () => {
    onSaveChangesClose();
  };

  const deleteStandard = () => {
    onDeleteStandardClose();
  };

  return (
    <>
      <Modal
        {...rest}
        isOpen={isOpenCardModal}
        onClose={onCloseCardModal}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <Form
          onSubmit={editSubmit}
          validate={cardEditValidator}
          render={() => {
            return (
              <>
                <ModalOverlay />
                <ModalContent rounded={14}>
                  <ModalCloseButton right={2} top={0} m={4} />
                  <ModalHeader mt={10} mx={6}>
                    <Flex justifyContent="space-between">
                      <Heading mb={2}>{card.title}</Heading>
                      {user.isAdmin ? (
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
                              openImagePreviewCallback={
                                openImagePreviewCallback
                              }
                              onImageDeleteOpen={onImageDeleteOpen}
                              isImageDeleteOpen={isImageDeleteOpen}
                              onImageDeleteClose={onImageDeleteClose}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>

                      <Text lineHeight="normal" fontSize="18px">
                        {card.criteria}
                      </Text>

                      <SimpleGrid
                        mt={3}
                        mb={15}
                        columns={2}
                        gap="1rem"
                        alignItems="end"
                      >
                        <Flex flexDirection="column" gap="1rem">
                          <HStack gap={1} overflowX="auto">
                            {card.tags.map((tag, index) => (
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
                                  >
                                    <CloseIcon h={1.5} w={1.5} />
                                  </Button>
                                ) : (
                                  <></>
                                )}
                              </Box>
                            ))}
                          </HStack>
                          {editing ? (
                            <Flex
                              border="solid 1px #B4B4B4B4"
                              rounded="xl"
                              alignItems="center"
                            >
                              <Input
                                placeholder="Add a Tag"
                                rounded="2xl"
                                border="none"
                                focusBorderColor="transparent"
                                width="full"
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
                              >
                                <ArrowUpIcon h={4} w={4} color="black" />
                              </Button>
                            </Flex>
                          ) : (
                            <></>
                          )}
                        </Flex>
                        <Flex gap={2} justifyContent="right">
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
                      </SimpleGrid>
                    </Flex>
                  </ModalBody>
                </ModalContent>
              </>
            );
          }}
        />
      </Modal>
      <ImagePreviewModal
        isOpen={isOpenImagePreviewModal}
        onClose={onCloseImagePreviewModal}
        card={card}
        setCards={setCards}
      />
      <ConfirmActionsModal
        isOpen={isDiscardChangesOpen}
        onClose={onDiscardChangesClose}
        handleDiscardChanges={discardChanges}
        prompt="Are you sure you want to discard all changes?"
        subcontent="All progress will be lost."
        abandonActionText="Yes, discard changes"
        confirmActionText="No, return to edit"
      />
      <ConfirmActionsModal
        isOpen={isSaveChangesOpen}
        onClose={onSaveChangesClose}
        handleDiscardChanges={saveChanges}
        prompt="Are you sure you want to save all changes?"
        abandonActionText="Yes, save changes"
        confirmActionText="No, return to edit"
      />
      <ConfirmActionsModal
        isOpen={isDeleteStandardOpen}
        onClose={onDeleteStandardClose}
        handleDiscardChanges={deleteStandard}
        prompt={`Are you sure you want to delete ${card.title}?`}
        subcontent="You will be unable to recover it after it has been deleted."
        abandonActionText="Yes, delete standard"
        confirmActionText="No, return to edit"
        colorScheme="red"
      />
    </>
  );
};
export default CardModal;
