/*
    Code adapted from React-Final-Form example:
    https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/chakra?file=/index.js
*/

import { Box, Button, Flex, FormLabel, Heading } from "@chakra-ui/react";
import React from "react";
import { Form } from "react-final-form";
import ImageUploadControl from "./ImageUpload";
import InputControl from "../FormComponents/InputControl";
import Multiselect from "../FormComponents/Multiselect";
import TextareaControl from "../FormComponents/TextareaControl";
import CreateTag from "./CreateTag";

const ReviewAddButton = () => (
  <Button
    bgColor="#03acc8"
    _hover={{
      bgColor: "#029ab5",
    }}
    p={4}
    mr="15%"
    color="white"
    size="md"
    rounded={16}
    fontSize="md"
    width="auto"
    type="submit"
  >
    Review and Add
  </Button>
);

const onSubmit = () => {
  console.log("submitting");
};

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "*This is a required field.";
  }
  if (!values.standardCriteria) {
    errors.standardCriteria = "*This is a required field.";
  }
  if (!values.uploadImages || values.uploadImages.length < 1) {
    errors.uploadImages = "*Upload at least one image.";
  }
  if (!values.buildingType || values.buildingType.length < 1) {
    errors.buildingType = "*Choose at least one category.";
  }
  if (!values.primaryCategory || values.primaryCategory.length < 1) {
    errors.primaryCategory = "*Choose at least one subcategory.";
  }

  return errors;
};

const buildingTypes = ["Multifamily", "Single Family", "Commercial"];
const primaryCategories = [
  "Site Planning",
  "Resource Efficiency",
  "Durability and Moisture Management",
  "High Performance Building Envelope",
  "Energy Efficient HVAC Systems",
  "Indoor Air Quality",
  "Plumbing and Irrigation",
  "Efficient Lighting and Appliances",
  "Education and Operations",
];

const AddStandardForm = () => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { setValue },
        },
      }) => (
        <Box p={8} pb={14} as="form" onSubmit={handleSubmit}>
          <Box w="50%">
            <Heading as="h1" size="lg" color="#6D6E70" textAlign="left" mb={8}>
              Add a New Standard
            </Heading>
            <FormLabel
              fontSize="xl"
              color="#8C8C8C"
              fontWeight="bold"
              textAlign="left"
              mb={1}
              mt={5}
            >
              General Information
            </FormLabel>
            <InputControl name="title" label="Title of Standard" type="text" />

            <TextareaControl
              name="standardCriteria"
              label="Standard Criteria"
            />

            <ImageUploadControl name="uploadImages" setValue={setValue} />

            <Multiselect
              name="buildingType"
              label="Building Type"
              entries={buildingTypes}
            />

            <Multiselect
              name="primaryCategory"
              label="Primary Category"
              entries={primaryCategories}
            />

            <CreateTag />
          </Box>

          <Flex width="100%" justifyContent="right">
            <ReviewAddButton onSubmit={onSubmit} />
          </Flex>
        </Box>
      )}
    />
  );
};

export default AddStandardForm;
