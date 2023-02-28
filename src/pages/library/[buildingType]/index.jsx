import { Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import CategoryCards from "src/components/CategoryCards";
import SearchBar, { useSearch } from "src/components/SearchBar";
import { buildingTypeNames } from "src/lib/utils/constants";

function CategoriesPage({ buildingType }) {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [setNumPages] = useState([]);
  const [setCurrentPage] = useState(1);

  const { handleSearch } = useSearch(
    cards,
    setNumPages,
    setCurrentPage,
    setCards,
    buildingType
  );

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
          <Text>{buildingTypeNames[buildingType]}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
      <SearchBar handleSearch={handleSearch} />
      <Flex flexWrap="wrap" gap="4rem">
        <CategoryCards routerQuery={router.query} />
      </Flex>
    </Flex>
  );
}

export async function getStaticProps({ params }) {
  const pageNumber = 0;
  const { buildingType, primaryCategory } = params;
  const cards = await getCardsPagination({
    pageNumber,
    buildingType: params.buildingType,
    primaryCategory: params.primaryCategory,
  });

  const cardsCount = await getCardsCount({
    buildingType,
    primaryCategory,
  });
  let numPages = Math.floor(cardsCount / 4);

  if (cardsCount % 4 > 0) {
    numPages += 1;
  }

  return {
    props: {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
      pageNumber: pageNumber + 1,
      buildingType: buildingTypeNames[params.buildingType],
      params,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(buildingTypeNames).map((buildingType) => {
      return {
        params: { buildingType },
      };
    }),
    fallback: false,
  };
}

export default CategoriesPage;
