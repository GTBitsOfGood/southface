import useSWR from "swr";
import { getActivePlan, updateActivePlan } from "../../actions/User";

// hook to get and update active plan for user, using SWR
// NOTE: user must be logged in
// returns:
//      plan: active plan
//      updatePlan: function to handle updating plan in DB, revalidating SWR cache
//      key: cache key, if that's necessary for whatever reason
export default function useActivePlan() {
  const url = "/api/user/active-plan/get";
  const { data, mutate: mutatePlan } = useSWR(url, getActivePlan);
  const plan = data?.payload;
  const updatePlan = (plan) => {
    updateActivePlan(plan).then((res) => {
      mutatePlan(
        res,
        { optimisticData: plan,   } // Immediately update UI and revalidate after
      );
    });
  };
  return { plan, updatePlan, key: url };
}
