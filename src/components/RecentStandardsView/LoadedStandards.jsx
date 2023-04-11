import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import urls from "src/lib/utils/urls";
import useSWRMutation from "swr/mutation";
import { getCardsByIdsRequest } from "../../actions/Card";
import useSelectionArray from "../../lib/hooks/useSelectionArray";
import StandardCardSmall from "../StandardCard/StandardCardSmall";

function LoadedStandards(props) {
  const [cards, setCards] = useState([]);
  const { trigger, data } = useSWRMutation(
    urls.api.user.standards.update,
    (route, { arg }) => {
      return getCardsByIdsRequest(arg.standardsData);
    }
  );

  useEffect(() => {
    if (data && data.ok) {
      data
        .clone()
        .json()
        .then((json) => {
          if (json == null) {
            throw new Error("Could not connect to API!");
          } else if (!json.success) {
            throw new Error(json.message);
          }
          let returnedCards = json.payload
            .map((card) => {
              let timestamp = props.standardsData.find(
                (el) => el.cardId == card._id
              );
              card.timeOpened = timestamp.timeOpened;
              return card;
            })
            .sort((a, b) => {
              return new Date(b.timeOpened) - new Date(a.timeOpened);
            });
          setCards(returnedCards);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!data && props.standardsData) {
      let newStandardsData = props.standardsData
        .sort((a, b) => {
          return new Date(b.timeOpened) - new Date(a.timeOpened);
        })
        .map((standard) => {
          return standard.cardId;
        })
        .slice(0, props.maxCards);
      trigger({
        standardsData: newStandardsData,
      });
    }
  }, [props.maxCards, props.standardsData, trigger, data]);
  const { selectionArray } = useSelectionArray(cards);
  return (
    <>
      <HStack maxH="200px" gap="10px">
        {props.standardsData ? (
          cards.map((card, index) => {
            {
              return (
                <StandardCardSmall
                  key={index}
                  card={card}
                  selState={selectionArray[index]}
                  cards={cards}
                  setCards={setCards}
                />
              );
            }
          })
        ) : (
          <></>
        )}
      </HStack>
    </>
  );
}

export default LoadedStandards;
