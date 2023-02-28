import { Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCardsPagination } from "server/mongodb/actions/Card";
import CategoryCards from "src/components/CategoryCards";
import SearchBar, { useSearch } from "src/components/SearchBar";
import { buildingTypeNames } from "src/lib/utils/constants";

function CategoriesPage({ buildingType }) {
  const router = useRouter();
  const { cards, setCards, filteredData, handleSearch } = useSearch([]);

  const getCards = async (pageNumber) => {
    const query = {
      buildingType: buildingType,
    };
    if (router.query.category) {
      query.primaryCategory = router.query.category;
    }
    const cards = await getCardsPagination({ ...query, pageNumber });
    setCards((prevCards) => [...prevCards, ...cards]);
  };

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
        <CategoryCards
          routerQuery={router.query}
          data={filteredData}
          setCards={setCards}
          cards={cards}
          getCards={getCards}
        />
      </Flex>
    </Flex>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      buildingType: params.buildingType,
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
