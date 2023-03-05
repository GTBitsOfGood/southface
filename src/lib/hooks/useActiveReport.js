import useSWR from "swr";
import {
  getActiveReport,
  updateActiveReport,
  changeInActiveReport,
  addToActiveReport,
  removeFromActiveReport,
} from "src/actions/User/ActiveReport";

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
  const report = data ?? {name: "empty plan", cards: []};
  const reportModifier = (localData, apiCall) => {
    mutateReport(localData, false);
    apiCall.then((res) => {
      mutateReport(res);
    });
  };

  const updateReport = (report) =>
    reportModifier(report, updateActiveReport(report));
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
        newReport.cards.push(card);
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
  };
}
