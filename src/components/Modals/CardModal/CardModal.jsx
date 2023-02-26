import { Modal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import cardEditValidator from "./cardEditValidator";
import CardModalFormContent from "./CardModalFormContent";

const CardModal = ({
  card,
  isOpenCardModal,
  onCloseCardModal,
  setCards,
  ...rest
}) => {
  const editSubmit = async () => {};

  const [initialCard, setInitialCard] = useState();
  useEffect(() => {
    setInitialCard(JSON.parse(JSON.stringify(card)));
  }, [card]);

  return (
    <>
      <Modal
        {...rest}
        isOpen={isOpenCardModal}
        onClose={onCloseCardModal}
        size={{ base: "xs", md: "2xl", lg: "4xl" }}
      >
        <Form
          onSubmit={editSubmit}
          validate={cardEditValidator}
          initialValues={initialCard}
          mutators={{
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value);
            },
          }}
          render={({
            form: {
              mutators: { setValue },
            },
          }) => {
            return (
              <CardModalFormContent
                card={card}
                setCards={setCards}
                onCloseCardModal={onCloseCardModal}
                setValue={setValue}
              />
            );
          }}
        />
      </Modal>
    </>
  );
};
export default CardModal;
