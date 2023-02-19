import { Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

function BuildingTypeCard(props) {
  return (
    <Flex justifyContent="center" direction="column" height="full" id="test">
      <Link href={props.href}>
        <Flex alignItems="center" direction="column" cursor="pointer">
          <Image
            src={props.src}
            alt={props.alt}
            width="250px"
            height="250px"
            objectFit="contain"
          />
          <Text fontWeight="bold">{props.title}</Text>
        </Flex>
      </Link>
    </Flex>
  );
}

export default BuildingTypeCard;
