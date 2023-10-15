import {
  Box,
  Flex,
  FormLabel,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Wrap,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { Form } from "react-final-form";
import { uploadFile } from "src/lib/utils/blobStorage";
import { createBuildingType } from "../../../actions/BuildingType";
import { uncapitalizeAndAddDash } from "../../../lib/utils/utilFunctions";
import ImageUpload from "../../AddStandard/ImageUpload";
import { SubHeading, SubText } from "../../AddStandard/utils";
import InputControl from "../../FormComponents/InputControl";
import {
  default as ConfirmActionModal,
  default as ConfirmActionsModal,
} from "../ConfirmActionModal";
import { BackButton, ReviewButton, SectionHeading } from "./utils";

const BuildingTypeModal = ({ isOpen, onClose }) => {
  const {
    isOpen: isDiscardChangesExitModalOpen,
    onOpen: onDiscardChangesExitModalOpen,
    onClose: onDiscardChangesExitModalClose,
  } = useDisclosure();
  const {
    isOpen: isOpenSubmitModal,
    onOpen: onOpenSubmitModal,
    onClose: onCloseSubmitModal,
  } = useDisclosure();

  const [dirty, setDirty] = useState(false);
  const [viewBuildingType, setViewBuildingType] = useState(false);
  const [buildingType, setBuildingType] = useState(null);

  let discardChangesAndExit = () => {
    onDiscardChangesExitModalClose();
    setViewBuildingType(false);
    onClose();
    setDirty(false);
  };
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "*This is a required field.";
    }
    if (!values.uploadImages || values.uploadImages.length < 1) {
      errors.uploadImages = "*Please upload cover image.";

      return errors;
    }
    return errors;
  };
  const isObjectEmpty = (obj) => {
    return Object.values(obj).every((value) => {
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return !value;
    });
  };
  const onReviewClick = async (values) => {
    if (buildingType == null || viewBuildingType == false) {
      const image = values.uploadImages[0];
      const blob = await uploadFile(image.name, image);
      const curImageUrl = blob._response.request.url;
      // const curImageUrl =
      //   "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";
      const newBuildingType = {
        imageUrl: curImageUrl,
        name: uncapitalizeAndAddDash(values.name),
      };
      setBuildingType(newBuildingType);
      setViewBuildingType(true);
      console.log(buildingType);
      return;
    }
  };
  const onSubmit = async () => {
    const newBuildingType = await createBuildingType(buildingType);
    console.log(newBuildingType);
    setDirty(false);
    setViewBuildingType(false);
    onCloseSubmitModal();
    onClose();
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (dirty || viewBuildingType == true) {
            onDiscardChangesExitModalOpen();
          } else {
            discardChangesAndExit();
          }
        }}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <ModalOverlay />
        <ModalContent rounded={14}>
          <ModalCloseButton right={2} top={0} m={4} />
          <ModalHeader mt={8} mx={6} fontSize="4xl" color="#6D6E70">
            Add A New Building Type
          </ModalHeader>
          <Form
            validate={validate}
            onSubmit={onSubmit} // Moved outside of the tags
            mutators={{
              setValue: ([field, value], state, { changeValue }) => {
                changeValue(state, field, () => value);
              },
            }}
            render={({ handleSubmit, form, values }) => {
              setDirty(form.getState().dirty);
              const isFormEmpty = isObjectEmpty(values);
              return (
                <form onSubmit={handleSubmit}>
                  {viewBuildingType === false ? (
                    <ModalBody mx={6} pt={0}>
                      <Box w="80%">
                        <Flex flexDirection="column">
                          <FormLabel
                            fontSize="xl"
                            fontWeight="bold"
                            color="#515254"
                            m="16px 0 16px 0"
                          >
                            General Information
                          </FormLabel>
                          <InputControl
                            name="name"
                            label="Title of Building Type"
                            type="text"
                          />
                          <ImageUpload
                            name="uploadImages"
                            label="Upload Cover Image"
                          />
                        </Flex>
                      </Box>
                      <Flex
                        mt={3}
                        mb={15}
                        flexDirection="row"
                        gap="1rem"
                        alignItems="end"
                        width="full"
                      >
                        <Flex
                          flex={1}
                          gap={2}
                          justifyContent="right"
                          width="max"
                        >
                          <ReviewButton
                            label="Review"
                            handleClick={() => onReviewClick(values)}
                            isFormEmpty={isFormEmpty}
                          ></ReviewButton>
                        </Flex>
                      </Flex>
                    </ModalBody>
                  ) : (
                    <ModalBody mx={6}>
                      <Box w="60%">
                        <Flex flexDirection="column">
                          <Heading fontSize="3xl" color="#515254">
                            Review
                          </Heading>

                          <SectionHeading text="General Information" />

                          <SubHeading text="Title of Building Type" />

                          <SubText text={buildingType.name} />

                          <SubHeading text="Cover Photo" />
                          <Wrap spacing={4}>
                            <VStack>
                              <Heading
                                size="xs"
                                color="Grey"
                                fontWeight="semibold"
                                mb={1}
                              >
                                {values.uploadImages &&
                                  values.uploadImages[0].name}
                              </Heading>
                              <Image
                                src={buildingType.imageUrl}
                                objectFit="cover"
                                height={125}
                                width={125}
                                alt="construction image"
                              />
                            </VStack>
                          </Wrap>
                        </Flex>
                      </Box>
                      <Flex w="full" justifyContent="right" my={8} gap="10px">
                        <BackButton
                          handleClick={() => setViewBuildingType(false)}
                          label="Back"
                        ></BackButton>
                        <ReviewButton
                          label="Finalize and Add"
                          handleClick={onOpenSubmitModal}
                          isFormEmpty={false}
                        ></ReviewButton>
                      </Flex>
                    </ModalBody>
                  )}
                  <ConfirmActionsModal
                    isOpen={isDiscardChangesExitModalOpen}
                    onClose={onDiscardChangesExitModalClose}
                    handleAction={() => {
                      form.reset();
                      discardChangesAndExit();
                    }}
                    mainText="Are you sure you want to discard all changes?"
                    subText="All progress will be lost."
                    confirmButtonText="Yes, discard changes"
                    cancelButtonText="No, return to edit"
                  />
                  <ConfirmActionModal
                    isOpen={isOpenSubmitModal}
                    onClose={onCloseSubmitModal}
                    mainText="Are you sure you want to create this new building type?"
                    confirmButtonText="Yes, add new type"
                    cancelButtonText="No, return to edit"
                    handleAction={() => {
                      form.reset();
                      onSubmit();
                    }}
                  />
                </form>
              );
            }}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuildingTypeModal;
