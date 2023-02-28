import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
  useDisclosure,
  Wrap,
} from "@chakra-ui/react";
import { useForm, useFormState } from "react-final-form";
import InputControl from "../FormComponents/InputControl";
import ConfirmActionModal from "../Modals/ConfirmActionModal";

const CreateTag = () => {
  const { values } = useFormState();
  const { mutators } = useForm();

  const updateTags = () => {
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
      <Heading color="#8C8C8C" fontSize="16px" my={2}>
        Tags
      </Heading>
      <Wrap>
        {values.tagArray &&
          values.tagArray.map((tag, idx) => (
            <Text key={idx} color="Grey" w="auto">
              {tag} &nbsp;
            </Text>
          ))}
      </Wrap>
    </Box>
  );
};

export default CreateTag;
