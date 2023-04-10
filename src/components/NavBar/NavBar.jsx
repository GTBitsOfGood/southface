import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { FiChevronsUp } from "react-icons/fi";
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
      return (
        <Flex align="center">
          <Box>
            <Flex marginRight={8}>
              <Text
                fontWeight="light"
                fontStyle="italic"
              >{`Logged in as `}</Text>
              <Text fontWeight="medium" fontStyle="italic" marginLeft={1}>
                {user.username}
              </Text>
            </Flex>
          </Box>

          <Divider orientation="vertical" h={6} borderColor="Grey" mr={0} />
          <NavLink name="Logout" onClick={onLogoutOpen} {...props} />
        </Flex>
      );
    }
  };

  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();

  const [buttonW, borderR] = ["200px", "10px"];

  const shoppingCartButtonStyle = {
    transform: "rotate(-90deg)",
    transformOrigin: "bottom right",
    backgroundColor: "white",
    color: "#3f3f3f",
    border: "1px solid #3f3f3f",
    borderBottom: "none",
    // right: "-" + buttonW,
    right: "0",
    height: "50px",
    top: "20vh",
    width: buttonW,
    position: "fixed",
    zIndex: "100",
    borderRadius: borderR + " " + borderR + " 0 0",
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
      {user?.isLoggedIn && (
        <NavLink name="Report Builder" href={urls.pages.reportbuilder} />
      )}
      {user?.isAdmin && (
        <NavLink name="Add a New Standard" href={urls.pages.addstandard} />
      )}
      <Box ml="auto" />{" "}
      {/*This is an empty div to right-align the last nav link */}
      <NavLinkAuth />
      {user?.isLoggedIn && currPage != "/report-builder" && currPage != "/add-standard" && (
        <>
          <ShoppingCartView
            buttonStyles={shoppingCartButtonStyle}
            isOpen={isCartOpen}
            onClose={onCartClose}
          />

          <Button
            fontSize="lg"
            onClick={onCartOpen}
            style={shoppingCartButtonStyle}
          >
            {<Icon as={FiChevronsUp} mr="1" fontSize="xl" />} Report Preview
          </Button>
        </>
      )}
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
