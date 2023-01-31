import { Flex } from "@chakra-ui/react";
import { createDefaultBuildingTypes } from "../../server/mongodb/actions/BuildingType";
import CategoryCards from "../components/CategoryCards";

function CategoriesPage() {
  return (
    <Flex gap="4rem" flexWrap="wrap" padding="2rem">
      <CategoryCards />
    </Flex>
  );
}

export async function getServerSideProps() {
  createDefaultBuildingTypes();
  return { props: {} };
}

export default CategoriesPage;
