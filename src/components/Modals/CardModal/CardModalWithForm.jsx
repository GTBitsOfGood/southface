import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { deleteCardById, revalidate, updateCardById } from "../../../actions/Card";
import cardEditValidator from "./cardEditValidator";
import CardModal from "./CardModal";
import { useRouter } from "next/router";

const CardModalWithForm = ({
  card,
  cards,
  isOpenCardModal,
  onCloseCardModal,
  setCards,
  ...rest
}) => {

  const router = useRouter();

  const editSubmit = async (values) => {
    const dirtyFields = Object.keys(values).filter((key) => {
      return values[key] !== initialCard[key] && key !== "newTag";
    });
    const dirtyValues = dirtyFields.reduce((obj, key) => {
      obj[key] = values[key];
      return obj;
    }, {});
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

    console.log(router.asPath);
    revalidate(JSON.stringify([router.asPath]))
  };

  const handleDeleteStandard = async () => {
    await deleteCardById(card._id);
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
            />
          );
        }}
      />
    </>
  );
};
export default CardModalWithForm;
