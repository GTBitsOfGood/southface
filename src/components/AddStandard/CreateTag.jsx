import { Box, Button, Flex, FormLabel, useDisclosure } from "@chakra-ui/react";
import { useForm, useFormState } from "react-final-form";
import { useSWRConfig } from "swr";
import { createTag } from "../../actions/Tag";
import urls from "../../lib/utils/urls";
import InputControl from "../FormComponents/InputControl";
import ConfirmActionModal from "../Modals/ConfirmActionModal";

const CreateTag = () => {
  const { values } = useFormState();
  const { mutators } = useForm();

  const { mutate } = useSWRConfig();

  const updateTags = () => {
    createTag(values.tag);

    mutate(urls.api.tag.getObject);

    const currArray = values.tagArray || [];
    currArray.push(values.tag);

    mutators.setValue("tagArray", currArray);
    mutators.setValue("tag", null);
  };

  const {
    isOpen: isCreateTagOpen,
    onOpen: onCreateTagOpen,
    onClose: onCreateTagClose,
  } = useDisclosure();

  return (
    <Box mb={4}>
      <FormLabel
        fontSize="xl"
        color="#8C8C8C"
        fontWeight="bold"
        textAlign="left"
        mb={1}
        mt={5}
      >
        Create a New Tag
      </FormLabel>
      <InputControl name="tag" label="Title of Tag" />
      <Flex w="full" justifyContent="right" mt={3}>
        <Button
          variant="Grey"
          size="sm"
          fontSize="md"
          width="auto"
          onClick={() => values.tag && onCreateTagOpen()}
        >
          Create Tag
        </Button>
        <ConfirmActionModal
          isOpen={isCreateTagOpen}
          onClose={onCreateTagClose}
          mainText="Are you sure you want to add this tag?"
          subText={values.tag}
          confirmButtonText="Yes, add tag."
          cancelButtonText="No, return to edit."
          handleAction={() => {
            updateTags();
            onCreateTagClose();
          }}
          isDanger={false}
        />
      </Flex>
    </Box>
  );
};

export default CreateTag;
