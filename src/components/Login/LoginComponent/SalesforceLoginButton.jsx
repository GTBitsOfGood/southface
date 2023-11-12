import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SalesforceLoginButton = ({ ssoUrl }) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.push(ssoUrl);
  };

  return (
    <Button width="100%" height="2.3em" variant="Blue" onClick={handleSubmit}>
      Log In with Salesforce
    </Button>
  );
};

export default SalesforceLoginButton;
