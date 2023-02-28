import { Box } from "@chakra-ui/react";
import LoginComponent from "../components/Login/LoginComponent";
import WrapperBox from "../components/Login/WrapperBox";

const LoginPage = () => {
  return (
    <Box height={{ base: "45em", "2xl": "50em" }}>
      <WrapperBox>
        <LoginComponent />
      </WrapperBox>
    </Box>
  );
};

export default LoginPage;
