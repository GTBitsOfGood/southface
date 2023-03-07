import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import urls from "src/lib/utils/urls";
import useSWRMutation from "swr/mutation";
import { getCardsByIdsRequest } from "../../actions/Card";
import useSelectionArray from "../../lib/hooks/useSelectionArray";
import StandardCard from "../StandardCard";

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
  }, [data, props]);

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
  const {selectionArray} = useSelectionArray(cards);
  return (
    <>
      <HStack height="21rem">
        {props.standardsData ? (
        cards.map((card, index) => {
          {
            return (
              <StandardCard
                key={index}
                card={card}
                height="3rem"
                minW="300px"
                selState={selectionArray[index]}
                cards={cards}
                setCards={setCards}
              ></StandardCard>
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
