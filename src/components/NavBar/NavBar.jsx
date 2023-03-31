import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import Router, { useRouter } from "next/router";

import { logout } from "src/actions/User";
import Image from "src/components/Image";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import ConfirmActionModal from "../Modals/ConfirmActionModal/ConfirmActionModal";
import ShoppingCartView from "../ShoppingCartView";
import NavLink from "./NavLink";

const NavBar = () => {
  const router = useRouter();
  const currPage = router.pathname;
  let confirmMessage;

  switch (currPage) {
    case "/add-standard":
      confirmMessage = "add a standard";
      break;
    case "/report-builder":
      confirmMessage = "report builder";
      break;
    default:
      confirmMessage = "digital library";
  }

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
      {user?.isLoggedIn && <NavLink name="Report Builder" href={urls.pages.reportbuilder} />}
      {user?.isAdmin && (
        <NavLink name="Add a New Standard" href={urls.pages.addstandard} />
      )}
      <NavLink name="Shopping Cart" onClick={onCartOpen} />
      <Box ml="auto" />{" "}
      {/*This is an empty div to right-align the last nav link */}
      <NavLinkAuth />
      <ShoppingCartView isOpen={isCartOpen} onClose={onCartClose} />
      <ConfirmActionModal
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        mainText="Are you sure you want to log out?"
        subText={
          currPage === "/add-standard"
            ? `You have unsaved changes in ${confirmMessage}`
            : null
        }
        confirmButtonText={`Yes, log out`}
        cancelButtonText={`No, return ${confirmMessage}`}
        handleAction={logoutHandler}
        isDanger={true}
      />
    </Flex>
  );
};

export default NavBar;
