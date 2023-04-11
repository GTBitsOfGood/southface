/*
    Code adapted from React-Final-Form example:
    https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/chakra?file=/index.js
*/

import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { createCard, revalidate } from "../../actions/Card";
import { uploadFile } from "../../lib/utils/blobStorage";
import {
  buildingTypeNames,
  primaryCategoryRoutes,
} from "../../lib/utils/constants";
import { parseNestedPaths } from "../../lib/utils/utilFunctions";
import EditAddStandard from "./EditAddStandard";
import OpenStandardPopup from "./OpenStandardPopup";
import ViewAddStandard from "./ViewAddStandard";

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
    errors.buildingType = "*Choose at least one building type.";
  }
  if (!values.primaryCategory || values.primaryCategory.length < 1) {
    errors.primaryCategory = "*Choose at least one primary category.";
  }

  return errors;
};

const AddStandardForm = () => {
  const [prevSubmitted, setPrevSubmitted] = useState();

  const onSubmit = async (values, form) => {
    if (values.isEditing) {
      form.mutators.setValue("isEditing", false);
      return;
    }
    const images = values.uploadImages.map(async (image) => {
      const blob = await uploadFile(image.name, image);
      const imageUrl = blob._response.request.url;

      // use for testing (placeholder)
      // const imageUrl =
      //   "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png";
      return {
        imageUrl: imageUrl,
        thumbsUp: [],
        thumbsDown: [],
      };
    });

    const buildingTypeKeys = values.buildingType.map((val) =>
      Object.keys(buildingTypeNames).find(
        (key) => buildingTypeNames[key] === val
      )
    );

    const primaryCategoryKeys = values.primaryCategory.map((val) =>
      Object.keys(primaryCategoryRoutes).find(
        (key) => primaryCategoryRoutes[key] === val
      )
    );

    const card = {
      // eslint-disable-next-line no-undef
      images: await Promise.all(images),
      title: values.title,
      criteria: values.standardCriteria,
      tags: values.tagArray || [],
      buildingType: buildingTypeKeys,
      primaryCategory: primaryCategoryKeys,
      notes: [],
    };

    const newCard = await createCard(card);

    setPrevSubmitted({
      title: newCard.title,
      buildingType: newCard.buildingType,
      primaryCategory: newCard.primaryCategory,
    });

    const revalidationPaths = JSON.stringify(
      parseNestedPaths("library", newCard.buildingType, newCard.primaryCategory)
    );
    await revalidate(revalidationPaths);

    form.reset();
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      mutators={{
        setValue: ([field, value], state, { changeValue }) => {
          changeValue(state, field, () => value);
        },
      }}
      initialValues={{
        isEditing: true,
      }}
    >
      {({ handleSubmit, values }) => (
        <Box p={14} pb={14} w="full" as="form" onSubmit={handleSubmit}>
          <HStack>
            <Heading as="h1" size="xl" color="Grey" textAlign="left" my={2}>
              Add a New Standard
            </Heading>

            {prevSubmitted && values.isEditing && (
              <OpenStandardPopup prevSubmitted={prevSubmitted} />
            )}
          </HStack>

          {values.isEditing ? (
            <EditAddStandard handleSubmit={handleSubmit} />
          ) : (
            <ViewAddStandard handleSubmit={handleSubmit} />
          )}
        </Box>
      )}
    </Form>
  );
};

export default AddStandardForm;
