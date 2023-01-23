import React from "react";
import {
  Flex,
  Text,
  Popover,
  PopoverContent,
  PopoverTrigger,
  IconButton,
  useDisclosure,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import NavLink from "../NavLink";
import routes from "./routes";
import useUser from "src/lib/hooks/useUser";

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

const DesktopHeader = ({ user, ...props }) => (
  <Flex {...props}>
    {routes
      // show the routes which don't require auth
      // and the ones that require auth and being logged in
      .filter((route) => (user?.isLoggedIn && route.auth) || !route.auth)
      .map(({ name, link }) => (
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
      ))}
  </Flex>
);

const MobileHeader = ({ user, ...props }) => {
  const { isOpen, onToggle } = useDisclosure();
  const loginNavButton = routes[routes.length - 1];
  return (
    <Flex
      {...props}
      width="full"
      flexDirection="row-reverse"
      alignItems="center"
    >
      <NavLink href={loginNavButton.link}>
        <Text fontSize="lg" color="whiteAlpha.900">
          {loginNavButton.name}
        </Text>
      </NavLink>
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
                    ((user?.isLoggedIn && route.auth) || !route.auth) &&
                    route.name !== "Login"
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
