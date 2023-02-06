import { Breadcrumb, BreadcrumbItem, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CategoryCards from "../../../components/CategoryCards";
import { buildingTypeNames } from "../../../lib/utils/constants";

function CategoriesPage(props) {
  const router = useRouter();
  const [buildingType, setBuildingType] = useState("");

  useEffect(() => {
    if (!Object.keys(buildingTypeNames).includes(props.buildingType)) {
      router.push("/");
    }
    setBuildingType(buildingTypeNames[buildingType]);
  }, [router, buildingType, props.buildingType]);

  return (
    <Flex
      padding="2rem"
      flexDirection="column"
      gap="2rem"
      fontWeight="semibold"
    >
      <Breadcrumb separator=">">
        <BreadcrumbItem>
          <Link href="/library">Digital Library</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <p>{buildingTypeNames[props.buildingType]}</p>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex flexWrap="wrap" gap="4rem">
        <CategoryCards routerQuery={router.query} />
      </Flex>
    </Flex>
  );
}

CategoriesPage.getInitialProps = async (context) => {
  return {
    ...context.query,
  };
};

export default CategoriesPage;
