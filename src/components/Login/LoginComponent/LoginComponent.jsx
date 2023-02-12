import { Box, Center, Flex, Heading, Link } from "@chakra-ui/layout";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { login } from "src/actions/User";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";

const LoginComponent = () => {
  const { mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: urls.pages.library,
  });

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    return mutateUser(
      login(username, password).catch((error) => window.alert(error.message))
    );
  };

  return (
    <Flex direction="column" height="65%" width="60%" gap="1em">
      <Heading size="lg">Login</Heading>
      <Box>
        <FormControl height="4em">
          <FormLabel>Username</FormLabel>
          <Input onChange={(event) => setUsername(event.target.value)} />
        </FormControl>
      </Box>
      <Box>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
      </Box>
      <Button
        width="100%"
        height="2.3em"
        colorScheme="green"
        onClick={handleSubmit}
      >
        Log In
      </Button>
      <Center gap="0.3em">
        {"Don't have an account?"}
        <Link>Sign Up</Link>
      </Center>
    </Flex>
  );
};

export default LoginComponent;
