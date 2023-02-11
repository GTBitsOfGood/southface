import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import Router from "next/router";
import { logout } from "src/actions/User";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import ShoppingCartView from "../ShoppingCartView";
import NavLink from "./NavLink";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  const logoutHandler = () => {
    logout()
      .then(() => Router.reload())
      .catch((error) => window.alert(error.message));
  };

  const NavLinkAuth = () => {
    if (!user?.isLoggedIn) {
      return <NavLink name="Login" href={urls.pages.login} />;
    } else {
      return <NavLink name="Logout" onClick={logoutHandler} />;
    }
  };

  const ChakraNextImage = ({ src, alt, ...rest }) => (
    <Box position="relative" {...rest}>
      <Image layout="fill" objectFit="cover" src={src} alt={alt} />
    </Box>
  );

  return (
    <Box>
      <ChakraNextImage
        src="/static/EarthcraftLogo.png"
        alt="Earthcraft-Logo"
        height="5em"
        width="16em"
        right={5}
        my={2}
      />

      <Flex
        mt={4}
        py={1}
        px={2}
        bg="#6D6E70"
        flexDir="row"
        justifyContent="space-evenly"
        color="white"
        fontWeight="bold"
      >
        <NavLink name="Digital Library" href={urls.pages.library} />
        <NavLink name="Project Plan Builder" href={urls.pages.planbuilder} />
        <NavLink name="Shopping Cart" onClick={onOpen} />
        <NavLinkAuth />
      </Flex>
      <ShoppingCartView isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default NavBar;
