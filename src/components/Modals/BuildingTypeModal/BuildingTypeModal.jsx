import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import useUser from "../../../lib/hooks/useUser";
import ImageUpload from "../../AddStandard/ImageUpload";
import ConfirmActionsModal from "../ConfirmActionModal";

const BuildingTypeModal = ({ isOpen, onClose, handleSubmit }) => {
  const {
    isOpen: isDiscardChangesExitModalOpen,
    onOpen: onDiscardChangesExitModalOpen,
    onClose: onDiscardChangesExitModalClose,
  } = useDisclosure();

  const {
    isOpen: isSaveChangesOpen,
    onOpen: onSaveChangesOpen,
    onClose: onSaveChangesClose,
  } = useDisclosure();

  const [dirty, setDirty] = useState(false);
  const [viewBuildingType, setViewBuildingType] = useState(false);
  const { user } = useUser();

  const saveChanges = () => {
    handleSubmit();
    onSaveChangesClose();
    // onClose();
    setViewBuildingType(true);
  };

  let discardChangesAndExit = () => {
    // reset();
    setDirty(false);
    // setEditing(false);
    onDiscardChangesExitModalClose();
    onClose();
  };

  const onSubmit = async (values) => {
    // On first submit, simply populate object
    // On second submit, submit the object
    return values;
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          if (dirty) {
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
          <ModalHeader mt={10} mx={6}>
            Add A New Building Type
          </ModalHeader>
          {viewBuildingType === false ? (
            <>
              <Form
                onSubmit={onSubmit} // Moved outside of the tags
                mutators={{
                  setValue: ([field, value], state, { changeValue }) => {
                    changeValue(state, field, () => value);
                  },
                }}
                render={({ handleSubmit, form }) => {
                  setDirty(form.getState().dirty);
                  return (
                    <form onSubmit={handleSubmit}>
                      <ModalBody mx={6}>
                        <Flex flexDirection="column">
                          <FormLabel
                            fontSize="xl"
                            fontWeight="bold"
                            color="#8C8C8C"
                            mb={1}
                            mt={5}
                          >
                            General Information
                          </FormLabel>
                          <Field name="title">
                            {({ input, meta }) => (
                              <div>
                                <Input
                                  {...input}
                                  label="Title of Standard"
                                  type="text"
                                />
                                {meta.error && meta.touched && (
                                  <span>{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>
                          <ImageUpload name="uploadImages" />

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
                              <Button
                                onClick={onSaveChangesOpen}
                                variant="Blue-rounded"
                                size="lg"
                                isDisabled={user?.isLoggedIn ? false : true}
                              >
                                Save
                              </Button>
                            </Flex>
                          </Flex>
                        </Flex>
                      </ModalBody>
                    </form>
                  );
                }}
              />
              )
            </>
          ) : (
            <></>
          )}
        </ModalContent>
        <ConfirmActionsModal
          isOpen={isDiscardChangesExitModalOpen}
          onClose={onDiscardChangesExitModalClose}
          handleAction={() => {
            discardChangesAndExit();
          }}
          mainText="Are you sure you want to discard all changes?"
          subText="All progress will be lost."
          confirmButtonText="Yes, discard changes"
          cancelButtonText="No, return to edit"
        />
        <ConfirmActionsModal
          isOpen={isSaveChangesOpen}
          onClose={onSaveChangesClose}
          handleAction={saveChanges}
          mainText="Are you sure you want to save all changes?"
          confirmButtonText="Yes, save changes"
          cancelButtonText="No, return to edit"
        />
      </Modal>
    </>
  );
};

export default BuildingTypeModal;
