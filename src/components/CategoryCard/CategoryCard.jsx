import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

function CategoryCard(props) {
  return (
    <Link href="/library">
      <Flex
        direction="column"
        alignItems="center"
        boxShadow="md"
        rounded="md"
        height="12rem"
        width="12rem"
        textAlign="center"
      >
        <Text fontWeight="extrabold" fontSize="4xl">
          {props.initials}
        </Text>
        <Text paddingX="2rem" fontWeight="semibold" paddingY="1rem">
          {props.title}
        </Text>
      </Flex>
    </Link>
  );
}

export default CategoryCard;