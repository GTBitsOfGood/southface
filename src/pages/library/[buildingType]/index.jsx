import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import CategoryCards from "src/components/CategoryCards";
import SearchBar from "src/components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import { buildingTypeNames } from "src/lib/utils/constants";
import CurrentSearchInfo from "src/components/SearchBar/CurrentSearchInfo";
import useSearch from "src/lib/hooks/useSearch";

function CategoriesPage({ buildingType }) {
  const router = useRouter();
  const [cards, setCards] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [numPages, setNumPages] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);

  const {
    handleSearch,
    searchString,
    tags,
    resetSearch,
    setResetSearch,
    tagToClear,
    setTagToClear,
  } = useSearch({
    setNumPages,
    setCurrentPage,
    setCards,
  });

  return (
    <Flex padding="2rem" flexDirection="column">
      <HStack w="full" position="relative">
        <Breadcrumb
          separator=">"
          fontWeight="semibold"
          position="absolute"
          top={3}
        >
          <BreadcrumbItem>
            <Link href="/library">Digital Library</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text>{buildingType}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box flex="1"></Box>
        <SearchBar
          handleSearch={handleSearch}
          resetSearch={resetSearch}
          tagToClear={tagToClear}
          setTagToClear={setTagToClear}
          setResetSearch={setResetSearch}
        />
      </HStack>
      <CurrentSearchInfo
        handleSearch={handleSearch}
        searchString={searchString}
        location={buildingType}
        tags={tags}
        setResetSearch={setResetSearch}
        setTagToClear={setTagToClear}
      />
      {cards.length > 0 ? (
        <StandardCardTable cards={cards} setCards={setCards} />
      ) : (
        <Flex flexWrap="wrap" gap="4rem" mt="2rem">
          <CategoryCards routerQuery={router.query} />
        </Flex>
      )}
    </Flex>
  );
}

export async function getStaticProps({ params }) {
  const pageNumber = 0;
  const { buildingType } = params;
  const cards = await getCardsPagination({
    pageNumber,
    buildingType: params.buildingType,
  });

  const cardsCount = await getCardsCount({
    buildingType,
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
  const paths = Object.keys(buildingTypeNames)
    .map((buildingType) => {
      return {
        params: {
          buildingType: buildingType,
        },
      };
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
}

export default CategoriesPage;
