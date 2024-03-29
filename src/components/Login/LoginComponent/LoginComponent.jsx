import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { login } from "src/actions/User";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import SalesforceLoginButton from "./SalesforceLoginButton";

const LoginComponent = ({ ssoUrl }) => {
  const { mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: urls.pages.library,
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    return mutateUser(
      login(username, password).catch((error) => window.alert(error.message))
    );
  };

  return (
    <Flex
      direction="column"
      height="65%"
      width="60%"
      gap="1em"
      fontFamily="Europa-Regular"
    >
      <Text fontSize="3xl" as="b" fontFamily="Roboto Slab">
        Login
      </Text>
      <Box>
        <FormControl height="4em">
          <FormLabel>Username</FormLabel>
          <Input
            onChange={(event) => setUsername(event.target.value)}
            borderColor="black"
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            borderColor="black"
          />
        </FormControl>
      </Box>
      <Button
        width="100%"
        height="2.3em"
        variant="Blue"
        onClick={handleSubmit}
        fontFamily="Europa-Bold"
      >
        Log In
      </Button>
      <SalesforceLoginButton ssoUrl={ssoUrl} />
      {/* <Center gap="0.3em">
        {"Don't have an account?"}
        <Link>Sign Up</Link>
      </Center> */}
    </Flex>
  );
};

export default LoginComponent;
