import urls from "lib/utils/urls";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { parseNestedPaths } from "src/lib/utils/utilFunctions";
import useSWR, { useSWRConfig } from "swr";
import {
  deleteCardById,
  revalidate,
  updateCardById,
} from "../../../actions/Card";

import { createTag } from "../../../actions/Tag";
import cardEditValidator from "./cardEditValidator";
import CardModal from "./CardModal";

const CardModalWithForm = ({
  card,
  cards,
  filteredTags,
  isOpenCardModal,
  onCloseCardModal,
  setCards,

  ...rest
}) => {
  // eslint-disable-next-line no-unused-vars
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const { data } = useSWR(urls.api.tag.getObject);
  const dbTags = data?.payload[0];
  const { mutate } = useSWRConfig();

  const editSubmit = async (values) => {
    const dirtyFields = Object.keys(values).filter((key) => {
      return values[key] !== initialCard[key] && key !== "newTag";
    });
    const dirtyValues = dirtyFields.reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});

    // this deletes the image from blob (but this image could be referenced in other cards!! thus making images appear null)
    // for (let i = 0; i < imagesToDelete.length; i++) {
    //   await deleteFile(imagesToDelete[i]);
    // }

    const newTagsToAdd = dirtyValues.tags?.filter((tag) => {
      const firstLetter = tag.charAt(0).toLowerCase();
      if (dbTags[firstLetter]) {
        const foundTag = dbTags[firstLetter].find((obj) => obj.name === tag);
        return !foundTag;
      } else {
        return true;
      }
    });

    newTagsToAdd?.forEach((tag) => {
      createTag(tag);
    });

    if (newTagsToAdd) {
      mutate(urls.api.tag.getObject);
    }

    let newCard = await updateCardById(card._id, dirtyValues);

    setCards((cards) => {
      return cards.map((card) => {
        if (newCard._id === card._id) {
          return newCard;
        } else {
          return card;
        }
      });
    });

    mutate(urls.api.user.activeReport.get);

    // setImagesToDelete([]);
    const revalidationPaths = JSON.stringify(
      parseNestedPaths("library", newCard.buildingType, newCard.primaryCategory)
    );

    await revalidate(revalidationPaths);
  };

  const handleDeleteStandard = async () => {
    const deletedCard = await deleteCardById(card._id);

    const revalidationPaths = JSON.stringify(
      parseNestedPaths(
        "library",
        deletedCard.buildingType,
        deletedCard.primaryCategory
      )
    );

    await revalidate(revalidationPaths);

    let newCards = [];
    for (let oldCardIndex in cards) {
      if (cards[oldCardIndex]._id !== card._id) {
        newCards[oldCardIndex] = cards[oldCardIndex];
      }
    }
    setCards(newCards);
  };

  const [initialCard, setInitialCard] = useState();
  useEffect(() => {
    setInitialCard(JSON.parse(JSON.stringify(card)));
  }, [card]);

  const { selState, selected } = { ...rest };

  return (
    <>
      <Form
        onSubmit={editSubmit}
        validate={cardEditValidator}
        initialValues={initialCard}
        mutators={{
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value);
            const fieldState = state.fields[field];
            if (fieldState) {
              fieldState.touched = true;
              fieldState.modified = true;
            }
          },
        }}
        render={({
          form: {
            mutators: { setValue },
          },
          form,
          handleSubmit,
        }) => {
          return (
            <CardModal
              card={card}
              setCards={setCards}
              onCloseCardModal={onCloseCardModal}
              setValue={setValue}
              reset={form.reset}
              handleSubmit={handleSubmit}
              registerField={form.registerField}
              isOpenCardModal={isOpenCardModal}
              rest={rest}
              handleDeleteStandard={handleDeleteStandard}
              selState={selState}
              selected={selected}
              setImagesToDelete={setImagesToDelete}
              filteredTags={filteredTags}
            />
          );
        }}
      />
    </>
  );
};
export default CardModalWithForm;
