import useSWR from "swr";
import { getActiveReport, updateActiveReport } from "../../actions/User";

// hook to get and update active plan for user, using SWR
// NOTE: user must be logged in
// returns:
//      plan: active plan
//      updatePlan: function to handle updating plan in DB, revalidating SWR cache
//      key: cache key, if that's necessary for whatever reason
export default function useActiveReport() {
  const url = "/api/user/active-plan/get";
  const { data: report, mutate: mutateReport, isValidating } = useSWR(url, getActiveReport);
  const updateReport = (report) => {
    updateActiveReport(report).then((res) => {
      mutateReport(
        res,
        { optimisticData: report } // Immediately update UI and revalidate after
      );
    });
  };
  console.log(report);
  return { report, updateReport, mutateReport, key: url, isValidating };
}
