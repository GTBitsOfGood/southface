import { Box, Button, Flex, FormLabel } from "@chakra-ui/react";
import { useEffect } from "react";
import { useFormState } from "react-final-form";
import {
  buildingTypeNames,
  primaryCategoryNames,
} from "../../lib/utils/constants";
import InputControl from "../FormComponents/InputControl";
import Multiselect from "../FormComponents/Multiselect";
import TextareaControl from "../FormComponents/TextareaControl";
import CreateTag from "./CreateTag";
import ImageUpload from "./ImageUpload";

const ReviewAddButton = ({ handleSubmit }) => {
  const { hasValidationErrors, submitFailed } = useFormState({
    subscription: { hasValidationErrors: true, submitFailed: true },
  });

  return (
    <Button
      variant="Blue"
      mr="15%"
      fontSize="md"
      onClick={handleSubmit}
      border={submitFailed && hasValidationErrors ? "2px solid red" : "none"}
    >
      Review and Add
    </Button>
  );
};

const EditAddStandard = ({ handleSubmit }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box>
      <Box w="50%">
        <FormLabel
          fontSize="xl"
          fontWeight="bold"
          color="#8C8C8C"
          mb={1}
          mt={5}
        >
          General Information
        </FormLabel>
        <InputControl name="title" label="Title of Standard" type="text" />

        <TextareaControl name="standardCriteria" label="Standard Criteria" />
      </Box>

      <ImageUpload name="uploadImages" />

      <Box w="50%">
        <Multiselect
          name="buildingType"
          label="Building Type"
          entries={Object.values(buildingTypeNames)}
        />

        <Multiselect
          name="primaryCategory"
          label="Primary Category"
          entries={Object.values(primaryCategoryNames)}
        />
      </Box>

      <Box w="50%">
        <CreateTag />
      </Box>

      <Flex width="full" justifyContent="right">
        <ReviewAddButton handleSubmit={handleSubmit} />
      </Flex>
    </Box>
  );
};

export default EditAddStandard;