import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Collapse,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { logout } from "src/actions/User";
import useUser from "src/lib/hooks/useUser";
import NavLink from "../NavLink";
import routes from "./routes";
import Router from "next/router";

const Header = () => {
  const { user } = useUser();
  return (
    <Flex p={6} bgColor="#004b4b">
      <DesktopHeader
        user={user}
        display={{ base: "none", md: "flex" }}
        width="100%"
      />
      <MobileHeader user={user} display={{ base: "flex", md: "none" }} />
    </Flex>
  );
};

const logoutHandler = () => {
  logout()
    .then(Router.reload(window.location.pathname))
    .catch((error) => window.alert(error.message));
};

const DesktopHeader = ({ user, ...props }) => (
  <Flex {...props}>
    {routes
      // show the routes which don't require auth
      // and the ones that require auth and being logged in
      //
      // Edit: now it shows the routes which require user to not be
      // logged in and not require auth or the routes that
      // require user to be logged in
      .filter(
        (route) =>
          (!user?.isLoggedIn && !route.auth) ||
          (user?.isLoggedIn && route.login)
      )
      .map(({ name, link }) =>
        name != "Logout" ? (
          <NavLink
            href={link}
            key={name}
            color="white"
            cursor="pointer"
            _hover={{ bgColor: "#002d2d" }}
            px={4}
            py={2}
            rounded={20}
            _last={{ ml: "auto" }}
          >
            <Text fontSize="lg">{name}</Text>
          </NavLink>
        ) : (
          <NavLink
            href={link}
            key={name}
            color="white"
            cursor="pointer"
            backgroundColor={"transparent"}
            _hover={{ bgColor: "#002d2d" }}
            px={4}
            py={2}
            rounded={20}
            _last={{ ml: "auto" }}
            onClick={logoutHandler}
          >
            <Text fontSize="lg">{name}</Text>
          </NavLink>
        )
      )}
  </Flex>
);

const MobileHeader = ({ user, ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  const toggleButton = user?.isLoggedIn
    ? routes[routes.length - 1]
    : routes[routes.length - 2];
  return (
    <Flex
      {...props}
      width="full"
      flexDirection="row-reverse"
      alignItems="center"
    >
      {user?.isLoggedIn ? (
        <NavLink href={toggleButton.link} onClick={logoutHandler}>
          <Text fontSize="lg" color="whiteAlpha.900">
            {toggleButton.name}
          </Text>
        </NavLink>
      ) : (
        <NavLink href={toggleButton.link}>
          <Text fontSize="lg" color="whiteAlpha.900">
            {toggleButton.name}
          </Text>
        </NavLink>
      )}
      <Popover trigger={"hover"}>
        <PopoverTrigger bgColor="transparent">
          <IconButton
            mr="auto"
            onClick={onToggle}
            bgColor="transparent"
            icon={
              isOpen ? (
                <CloseIcon color="white" w={5} h={5} />
              ) : (
                <HamburgerIcon color="white" w={7} h={7} />
              )
            }
          />
        </PopoverTrigger>
        <Collapse in={isOpen} animateOpacity>
          <PopoverContent border={0} boxShadow={"xl"} width="100vw">
            <Flex flexDir="column">
              {routes
                // show the routes which don't require auth
                // and the ones that require auth and being logged in
                .filter(
                  (route) =>
                    ((!user?.isLoggedIn && !route.auth) ||
                      (user?.isLoggedIn && route.login)) &&
                    route.name !== "Login" &&
                    route.name !== "Logout"
                )
                .map(({ name, link }) => (
                  <NavLink
                    key={name}
                    href={link}
                    onClick={onToggle}
                    width="full"
                    justifyContent="center"
                  >
                    <Text p={3} color="gray.700" fontWeight="bold">
                      {name}
                    </Text>
                  </NavLink>
                ))}
            </Flex>
          </PopoverContent>
        </Collapse>
      </Popover>
    </Flex>
  );
};

export default Header;
