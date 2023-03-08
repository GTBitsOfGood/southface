import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";

import { logout } from "src/actions/User";
import Image from "src/components/Image";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import LogoutModal from "../Modals/LogoutModal";
import ShoppingCartView from "../ShoppingCartView";
import NavLink from "./NavLink";

const NavBar = () => {
  const router = useRouter();
  const currPage = router.pathname;

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();

  const { user } = useUser();

  const logoutHandler = () => {
    logout()
      .then(() => Router.reload())
      .catch((error) => window.alert(error.message));
  };

  const NavLinkAuth = (props) => {
    if (!user?.isLoggedIn) {
      return <NavLink name="Login" href={urls.pages.login} {...props} />;
    } else {
      return <NavLink name="Logout" onClick={onLogoutOpen} {...props} />;
    }
  };

  return (
    <Flex boxShadow="base" py="2">
      <Image
        src="/static/EarthcraftLogo.png"
        alt="Earthcraft-Logo"
        height="6em"
        width="14em"
        right={5}
      />
      <NavLink name="Digital Library" href={urls.pages.library} />
      <NavLink name="Report Builder" href={urls.pages.reportbuilder} />
      {user && user.isAdmin && (
        <NavLink name="Add a New Standard" href={urls.pages.addstandard} />
      )}
      <NavLink name="Shopping Cart" onClick={onCartOpen} />
      <Box ml="auto" />{" "}
      {/*This is an empty div to right-align the last nav link */}
      <NavLinkAuth />
      <ShoppingCartView isOpen={isCartOpen} onClose={onCartClose} />
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        onLogout={logoutHandler}
        currPage={currPage}
      />
    </Flex>
  );
};

export default NavBar;
