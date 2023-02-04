import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { buildingTypeNames } from "../../../../server/mongodb/models/Card";
import CategoryCards from "../../../components/CategoryCards";

function CategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      const { buildingType } = router.query;
      if (!buildingTypeNames.includes(buildingType)) {
        router.push("/");
      }
    }
  }, [router]);

  return (
    <Flex gap="4rem" flexWrap="wrap" padding="2rem">
      <CategoryCards routerQuery={router.query} />
    </Flex>
  );
}

// Prevent SSG in order to enable the use of useRouter()
CategoriesPage.getInitialProps = async () => {
  return {};
};

export default CategoriesPage;
