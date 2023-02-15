import useSWR from "swr";
import { getActivePlan } from "../../actions/User";

export default function useActivePlan() {
    const url = "/api/user/active-plan/get";
    const { data, mutate: updatePlan } = useSWR(url, getActivePlan);
    const plan = data?.payload;
    return { plan, updatePlan, key: url };
}
