import useUser from "src/lib/hooks/useUser";
import { removeFromActivePlan } from "../../actions/User";

const ProjectPlanStandard = ({card}) => {
  const { user } = useUser();
  const handler = () => {
    removeFromActivePlan(user.id, card)
  }
  return <h1 onClick={handler}>{card.title}</h1>;
};

export { ProjectPlanStandard };
