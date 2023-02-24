/*
    Code adapted from React-Final-Form example:
    https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/chakra?file=/index.js
*/

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Field, Form, useField } from "react-final-form";
import { MdUpload } from "react-icons/md";

const Control = ({ name, ...rest }) => {
  const {
    meta: { error, touched },
  } = useField(name, { subscription: { touched: true, error: true } });
  return <FormControl {...rest} isInvalid={error && touched} />;
};

const Multiselect = ({ name, label, entries }) => {
  return (
    <Control name={name} my={4}>
      <HStack>
        <FormLabel htmlFor={name} m={0}>
          {label}
        </FormLabel>
        <Error name={name} />
      </HStack>

      <Stack mt={1} spacing={1}>
        {entries.map((e, index) => (
          <CheckboxArrayControl key={index} name={name} value={e}>
            {e}
          </CheckboxArrayControl>
        ))}
      </Stack>
    </Control>
  );
};

const Error = ({ name }) => {
  const {
    meta: { error },
  } = useField(name, { subscription: { error: true } });
  return <FormErrorMessage>{error}</FormErrorMessage>;
};

const InputControl = ({ name, label, type }) => {
  const { input, meta } = useField(name);
  return (
    <Control name={name} my={4}>
      <HStack>
        <FormLabel htmlFor={name} m={0}>
          {label}
        </FormLabel>
        <Error name={name} />
      </HStack>
      <Input
        {...input}
        isInvalid={meta.error && meta.touched}
        id={name}
        type={type}
      />
    </Control>
  );
};

const ImageUploadControl = ({ name }) => {
  const { input, meta } = useField(name);
  const ref = useRef();
  return (
    <Control name={name} my={4}>
      <HStack>
        <Button
          leftIcon={<MdUpload />}
          bgColor={useColorModeValue("blackAlpha.500")}
          _hover={{
            bgColor: `${useColorModeValue("blackAlpha.600")}`,
          }}
          color="white"
          size="md"
          rounded={16}
          fontSize="md"
          width="auto"
          onClick={() => ref.current.click()}
        >
          Upload Images
        </Button>
        <Error name={name} />
      </HStack>
      <Input
        {...input}
        isInvalid={meta.error && meta.touched}
        id={name}
        ref={ref}
        type="file"
        display="none"
      />
    </Control>
  );
};

const CheckboxArrayControl = ({ name, value, children }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched },
  } = useField(name, {
    type: "checkbox",
    value,
  });
  return (
    <Checkbox {...input} isChecked={checked} isInvalid={error && touched}>
      {children}
    </Checkbox>
  );
};

const AdaptedTextarea = ({ input, meta, ...rest }) => (
  <Textarea {...input} {...rest} isInvalid={meta.error && meta.touched} />
);

const TextareaControl = ({ name, label }) => (
  <Control name={name} my={4}>
    <HStack>
      <FormLabel htmlFor={name} m={0}>
        {label}
      </FormLabel>
      <Error name={name} />
    </HStack>
    <Field name={name} component={AdaptedTextarea} id={name} />
  </Control>
);

const ReviewAddButton = () => (
  <Button
    bgColor="#03acc8"
    _hover={{
      bgColor: "#029ab5",
    }}
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
  if (!values.uploadImages) {
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
    <Box w="50%" p={4}>
      <Heading as="h1" size="xl" textAlign="left">
        Add a New Standard
      </Heading>
      <Heading as="h2" size="md" textAlign="left" mb={5} mt={5}>
        General Information
      </Heading>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({
          handleSubmit,
          //   form,
          //   errors,
          //   submitting,
          //   pristine,
          //   values,
        }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <InputControl name="title" label="Title of Standard" type="text" />

            <TextareaControl
              name="standardCriteria"
              label="Standard Criteria"
            />

            <ImageUploadControl name="uploadImages" />

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

            <ReviewAddButton />
          </Box>
        )}
      />
    </Box>
  );
};

export default AddStandardForm;
