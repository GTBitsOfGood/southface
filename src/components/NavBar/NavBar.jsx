import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  useBreakpointValue,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import { FiChevronsUp } from "react-icons/fi";
import { logout } from "src/actions/User";
import Image from "src/components/Image";
import useUser from "src/lib/hooks/useUser";
import urls from "src/lib/utils/urls";
import MobileNavBar from "../MobileNavBar/MobileNavBar";
import ConfirmActionModal from "../Modals/ConfirmActionModal/ConfirmActionModal";
import ShoppingCartView from "../ShoppingCartView";
import NavLink from "./NavLink";

const NavBar = () => {
  const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
  const theme = useTheme();
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
      return (
        <NavLink
          fontFamily="Europa-Regular"
          name="Login"
          href={urls.pages.login}
          {...props}
        />
      );
    } else {
      return (
        <Flex align="center">
          <Box>
            <Flex marginRight={8}>
              <Text
                fontWeight="400"
                fontStyle="normal"
                fontFamily="'Europa-Regular', sans-serif"
                color="#6D6E70"
              >{`Signed in as `}</Text>
              <Text
                fontWeight="700"
                fontStyle="regular"
                marginLeft={1}
                fontFamily="'Europa-Regular', sans-serif"
                color="#6D6E70"
              >
                {user.username}
              </Text>
            </Flex>
          </Box>

          <Divider orientation="vertical" h={6} borderColor="#6D6E70" mr={0} />
          <NavLink
            name="Sign Out"
            color="#00ACC8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: "700",
            }}
            onClick={onLogoutOpen}
            {...props}
          />
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

  console.log(currPage);
  return (
    <Flex boxShadow="base" py="2">
      {breakpoint === "base" ? (
        <MobileNavBar
          isLoggedIn={user?.isLoggedIn}
          username={user?.username}
          onLogout={onLogoutOpen}
          isAdmin={user?.isAdmin}
          isLogoutOpen={isLogoutOpen}
          onLogoutOpen={onLogoutOpen}
          onLogoutClose={onLogoutClose}
          logoutHandler={logoutHandler}
        />
      ) : (
        <>
          <Image
            src="/static/EarthcraftLogo.png"
            alt="Earthcraft-Logo"
            height="6em"
            width="14em"
            right={5}
          />
          <NavLink
            name="Digital Library"
            href={urls.pages.library}
            style={{
              color: theme.colors.Grey,
              fontFamily: theme.fonts.heading,
              fontWeight: theme.fonts.regular,
            }}
            _before={{
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "2px",
              background: currPage == "/library" ? "#00ACC8" : "transparent",
            }}
            _hover={{
              color: "#515254",
              _before: {
                background: "#00ACC8",
              },
            }}
          />
          {user?.isLoggedIn && (
            <NavLink
              name="Report Builder"
              href={urls.pages.reportbuilder}
              style={{
                color: theme.colors.Grey,
                fontFamily: theme.fonts.heading,
                fontWeight: theme.fonts.regular,
              }}
              _before={{
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "2px",
                background:
                  currPage == "/report-builder" ? "#00ACC8" : "transparent",
              }}
              _hover={{
                _before: {
                  background: "#00ACC8",
                },
              }}
            />
          )}
          {user?.isAdmin && (
            <NavLink
              name="Add a New Standard"
              href={urls.pages.addstandard}
              style={{
                color: theme.colors.Grey,
                fontFamily: theme.fonts.heading,
                fontWeight: theme.fonts.regular,
              }}
              _before={{
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: "2px",
                background:
                  currPage == "/add-standard" ? "#00ACC8" : "transparent",
              }}
              _hover={{
                _before: {
                  background: "#00ACC8",
                },
              }}
            />
          )}
          <Box ml="auto" />{" "}
          {/*This is an empty div to right-align the last nav link */}
          <NavLinkAuth />
          {user?.isLoggedIn &&
            currPage != "/report-builder" &&
            currPage != "/add-standard" && (
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
                  fontFamily="Europa-Regular"
                >
                  {<Icon as={FiChevronsUp} mr="1" fontSize="xl" />} Report
                  Preview
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
        </>
      )}
    </Flex>
  );
};

export default NavBar;
