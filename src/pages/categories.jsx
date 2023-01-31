import { Flex } from "@chakra-ui/react";
import { createDefaultBuildingTypes } from "../../server/mongodb/actions/BuildingType";
import CategoryCard from "../components/CategoryCard";

function CategoriesPage() {
  return (
    <Flex gap="4rem" flexWrap="wrap" padding="2rem">
      <CategoryCard initials="SP" title="Site Planning" />
      <CategoryCard initials="RE" title="Resource Efficiency" />
      <CategoryCard initials="DU" title="Durability and Moisture Management" />
      <CategoryCard initials="BE" title="High Performance Building Envelope" />
      <CategoryCard initials="ES" title="Energy Efficient HVAC Systems" />
      <CategoryCard initials="IAQ" title="Indoor Air Quality" />
      <CategoryCard initials="PI" title="Plumbing and Irrigation" />
      <CategoryCard initials="LA" title="Efficient Lighting and Appliances" />
      <CategoryCard initials="EO" title="Education and Operations" />
    </Flex>
  );
}

export async function getServerSideProps() {
  createDefaultBuildingTypes();
  return { props: {} };
}

export default CategoriesPage;
