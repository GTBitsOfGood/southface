/*
    Code adapted from React-Final-Form example:
    https://codesandbox.io/s/github/final-form/react-final-form/tree/master/examples/chakra?file=/index.js
*/

import { Box, Heading, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-final-form";
import { createCard, createManyCards } from "../../actions/Card";
import {
  buildingTypeNames,
  primaryCategoryRoutes,
} from "../../lib/utils/constants";
import EditAddStandard from "./EditAddStandard";
import OpenStandardPopup from "./OpenStandardPopup";
import ViewAddManyStandards from "./ViewAddManyStandards";
import ViewAddStandard from "./ViewAddStandard";

const validate = (values) => {
  const errors = {};

  if (values.massUpload) {
    return;
  }

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

    if (values.massUpload) {
      const cards = values.massUpload;
      const newCards = await createManyCards(cards);

      setPrevSubmitted({
        title: newCards[0].title,
        buildingType: newCards[0].buildingType,
        primaryCategory: newCards[0].primaryCategory,
      });

      form.reset();

      return;
    }

    const images = values.uploadImages.map(() => {
      return {
        imageUrl:
          "https://user-images.githubusercontent.com/69729390/214123449-126291c9-2cde-4773-90b7-a54a38336553.png",
        thumbsUp: 0,
        thumbsDown: 0,
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
      images: images,
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
          ) : values.massUpload ? (
            <ViewAddManyStandards handleSubmit={handleSubmit} />
          ) : (
            <ViewAddStandard handleSubmit={handleSubmit} />
          )}
        </Box>
      )}
    </Form>
  );
};

export default AddStandardForm;
