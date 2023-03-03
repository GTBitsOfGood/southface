import { BellIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  buildingTypeNames,
  primaryCategoryRoutes,
} from "../../lib/utils/constants";

const OpenStandardPopup = ({ prevSubmitted }) => {
  const [display, setDisplay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const router = useRouter();

  const handleReroute = () => {
    setIsLoading(true);

    // buildingType and primaryCategory are arrays, so we take the first entry
    const buildingTypeKey = Object.keys(buildingTypeNames).find(
      (key) => buildingTypeNames[key] === prevSubmitted.buildingType[0]
    );
    const primaryCategoryKey = Object.keys(primaryCategoryRoutes).find(
      (key) => primaryCategoryRoutes[key] === prevSubmitted.primaryCategory[0]
    );

    const newRoute = "/library/" + buildingTypeKey + "/" + primaryCategoryKey;

    router.push(newRoute);
  };

  const handleClose = () => {
    setIsFading(true);

    setTimeout(() => {
      setDisplay(false);
      setIsFading(false);
    }, 0.2);
  };

  return (
    <Box
      position="absolute"
      alignItems="center"
      justifyContent="center"
      w="auto"
      right="10%"
      rounded="md"
      border="1px solid Grey"
      p={2}
      bgColor="#F2F2F2"
      color="Grey"
      opacity={display ? 1 : 0}
      transition="opacity 0.2s"
      display={display || isFading ? "flex" : "none"}
    >
      <BellIcon mr={2} />
      <Text mr={4}>View {prevSubmitted.title} in the Digital Library</Text>
      {isLoading ? (
        <Spinner size="xs" mr={3} />
      ) : (
        <Button variant="Blue-rounded" size="xs" mr={3} onClick={handleReroute}>
          View
        </Button>
      )}

      <IconButton
        variant="Grey-outlined-rounded"
        icon={<CloseIcon size="lg" />}
        color="Grey"
        position="absolute"
        size="xs"
        top="-.6rem"
        right="-.6rem"
        onClick={handleClose}
      />
    </Box>
  );
};

export default OpenStandardPopup;
