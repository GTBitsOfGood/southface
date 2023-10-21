import { Box, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

function BuildingTypeCard(props) {
  return (
    <Flex justifyContent="center" direction="column" height="full" id="test">
      <Link href={props.href}>
        <Flex alignItems="center" direction="column" cursor="pointer">
          <Box maxWidth="250px" maxHeight="250px">
            <Image src={props.src} alt={props.alt} objectFit="contain" />
          </Box>
          <Text fontWeight="bold">{props.title}</Text>
        </Flex>
      </Link>
    </Flex>
  );
}

export default BuildingTypeCard;
