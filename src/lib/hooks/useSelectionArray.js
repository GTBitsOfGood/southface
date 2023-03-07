import { useEffect, useState } from "react";
import useActiveReport from "./useActiveReport";

export default function useSelectionArray(cards) {
  const { report, isValidating } = useActiveReport();
  const [selArr, setSelArr] = useState([]); // array of ar objects or undefined objects, updated when report changes
  useEffect(() => {
    // useEffect on report:
    // cards.map(card => card.id in report.cardIds ? report.cardWrapper : undefined)
    if (report && !isValidating) {
      const reportIds = report.cards.map((c) => c.card._id);
      const newArr = cards.map((card) => {
        const i = reportIds.indexOf(card._id);
        if (i < 0) {
          return undefined;
        } else {
          return report.cards[i];
        }
      });
      setSelArr(newArr);
    }
  }, [isValidating]);
  return { selectionArray: selArr, setSelectionArray: setSelArr };
}
