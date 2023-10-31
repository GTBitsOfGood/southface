import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import Image from "src/components/Image";
import urls from "src/lib/utils/urls";
import ConfirmActionModal from "../Modals/ConfirmActionModal/ConfirmActionModal";
import NavLink from "../NavBar/NavLink";

const MobileNavBar = ({
  isLoggedIn,
  username,
  isAdmin,
  isLogoutOpen,
  onLogoutOpen,
  onLogoutClose,
  logoutHandler,
}) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Flex alignItems="center">
        <Image
          src="/static/EarthcraftLogo.png"
          alt="Earthcraft-Logo"
          height="6em"
          width="14em"
        />
        {isLoggedIn && (
          <IconButton
            aria-label="Logout"
            icon={<ArrowForwardIcon />}
            size="md"
            variant="outline"
            colorScheme="red"
            onClick={onLogoutOpen}
          />
        )}
      </Flex>

      {isLoggedIn && (
        <Flex mt={4}>
          <Text>{`Logged in as ${username}`}</Text>
        </Flex>
      )}

      <Flex mt={2} whiteSpace="nowrap">
        <NavLink
          name="Digital Library"
          href={urls.pages.library}
          fontWeight="bold"
          fontSize="sm"
        />
        {isLoggedIn && (
          <NavLink
            name="Report Builder"
            href={urls.pages.reportbuilder}
            fontWeight="bold"
            fontSize="sm"
          />
        )}
        {isAdmin && (
          <NavLink
            name="Add a New Standard"
            href={urls.pages.addstandard}
            fontWeight="bold"
            fontSize="sm"
          />
        )}
      </Flex>

      <ConfirmActionModal
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        mainText="Are you sure you want to log out?"
        confirmButtonText={`Yes, log out`}
        handleAction={logoutHandler}
        isDanger={true}
      />
    </Flex>
  );
};

export default MobileNavBar;
