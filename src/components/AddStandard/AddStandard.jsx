import useUser from "../../lib/hooks/useUser";
import AddStandardForm from "./AddStandardForm";

const AddStandard = () => {
  const { user, ifAdmin } = useUser({
    redirectTo: "/login",
  });

  if (user) {
    if (user.isAdmin) {
      return <AddStandardForm />;
    } else {
      ifAdmin();
    }
  }
};

export default AddStandard;
