import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

function CategoryCard(props) {
  return (
    <Link
      href={`${props.routerQuery.buildingType}/${props.title
        .toLowerCase()
        .replace(/ /g, "-")}`}
    >
      <Flex
        direction="column"
        alignItems="center"
        boxShadow="0px 5px 4px rgba(0, 0, 0, 0.2)"
        rounded="xl"
        height="12rem"
        width="12rem"
        textAlign="center"
        cursor="pointer"
        paddingTop="1rem"
        paddingBottom="1rem"
      >
        <Text textAlign="center" textStyle="primaryText">
          {props.initials}
        </Text>
        <Text
          paddingX="1rem"
          textAlign="center"
          paddingY="1rem"
          textStyle="secondaryText"
        >
          {props.title}
        </Text>
      </Flex>
    </Link>
  );
}

export default CategoryCard;
