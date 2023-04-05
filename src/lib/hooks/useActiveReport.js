import { useState } from "react";
import {
  addToActiveReport,
  changeInActiveReport,
  getActiveReport,
  removeFromActiveReport,
  updateActiveReport,
} from "src/actions/User/ActiveReport";
import useSWR from "swr";

// hook to get and update active plan for user, using SWR
// NOTE: user must be logged in
// returns:
//      plan: active plan
//      updatePlan: function to handle updating plan in DB, revalidating SWR cache
//      key: cache key, if that's necessary for whatever reason
export default function useActiveReport() {
  const url = "/api/user/active-report/get";
  const {
    data,
    mutate: mutateReport,
    isValidating,
  } = useSWR(url, getActiveReport);
  // there is no payload extraction needed here, since we're using a f-e handler
  const report = data ?? { name: "empty plan", cards: [] };

  const [isWaiting, setIsWaiting] = useState(false);
  const reportModifier = (localData, apiCall) => {
    setIsWaiting(true);
    // mutateReport(localData, false);
    return apiCall.then((res) => {
      mutateReport(res);
      setIsWaiting(false);
    });
  };

  const updateReport = (report) => {
    return reportModifier(report, updateActiveReport(report));
  };

  const changeInReport = (card) =>
    reportModifier(
      (function () {
        const newReport = { ...report };
        const cards = newReport.cards;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].card._id.toString() === card._id.toString()) {
            report.cards[i] = card;
            break;
          }
          return report;
        }
      })(),
      changeInActiveReport(card)
    );

  const addToReport = (card) =>
    reportModifier(
      (function () {
        const newReport = { ...report };
        const cards = newReport.cards;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].card._id.toString() === card._id.toString()) {
            return newReport;
          }
        }
        newReport.cards.push({
          card: card,
          imgSelections: Array(card.images.length).fill(true),
          noteSelections: Array(card.notes.length).fill(true),
        });
        return newReport;
      })(),
      addToActiveReport(card)
    );

  const removeFromReport = (card) =>
    reportModifier(
      (function () {
        const newReport = { ...report };
        const cards = newReport.cards;
        for (let i = 0; i < cards.length; i++) {
          if (cards[i].card._id.toString() === card._id.toString()) {
            report.cards.splice(i, 1);
            break;
          }
          return newReport;
        }
      })(),
      removeFromActiveReport(card)
    );

  return {
    report,
    mutateReport,
    updateReport,
    changeInReport,
    addToReport,
    removeFromReport,
    key: url,
    isValidating,
    isWaiting,
  };
}
