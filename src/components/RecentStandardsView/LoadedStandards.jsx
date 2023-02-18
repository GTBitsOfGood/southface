import { useEffect, useState } from "react";
import { getCardsByIds } from "../../actions/Card";
import StandardCard from "../StandardCard";

function LoadedStandards(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (props.standardsData) {
      fetchCards().then((res) => setCards(res));
    }
    function fetchCards() {
      const response = getCardsByIds(
        props.standardsData
          .map((standard) => {
            return standard.cardId;
          })
          .sort((a, b) => {
            return a.timeUpdated - b.timeUpdated;
          })
          .slice(0, 3)
      );
      //   console.log(
      //     props.standardsData
      //       .map((standard) => {
      //         return standard.cardId;
      //       })
      //       .sort((a, b) => {
      //         return a.timeUpdated - b.timeUpdated;
      //       })
      //       .slice(0, 3)
      //   );
      return response;
    }
  }, [props.standardsData]);

  return (
    <>
      {props.standardsData ? (
        cards.map((card, index) => {
          {
            return <StandardCard key={index} card={card}></StandardCard>;
          }
        })
      ) : (
        <></>
      )}
    </>
  );
}

export default LoadedStandards;
