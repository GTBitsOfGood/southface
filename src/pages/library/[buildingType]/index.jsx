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
import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import CategoryCards from "src/components/CategoryCards";
import PaginationTab from "src/components/PaginationTab";
import SearchBar from "src/components/SearchBar";
import CurrentSearchInfo from "src/components/SearchBar/CurrentSearchInfo";
import StandardCardTable from "src/components/StandardCardTable";
import useSearch from "src/lib/hooks/useSearch";
import { capitalizeAndRemoveDash } from "src/lib/utils/utilFunctions";

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

  console.log(cards);

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
        <>
          <StandardCardTable cards={cards} setCards={setCards} />
          <PaginationTab
            numPages={numPages}
            alignSelf="center"
            border="1px solid black"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setCards={setCards}
            searchString={searchString}
            tags={tags}
          />
        </>
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
  let numPages = Math.floor(cardsCount / 6);

  if (cardsCount % 6 > 0) {
    numPages += 1;
  }

  return {
    props: {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
      pageNumber: pageNumber + 1,
      buildingType: capitalizeAndRemoveDash(params.buildingType),
      params,
    },
  };
}

export async function getStaticPaths() {
  const buildingTypes = await getBuildingTypes();
  const buildingTypeNames = buildingTypes.map(
    (buildingType) => buildingType.name
  );
  const paths = buildingTypeNames
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
    fallback: true,
  };
}

export default CategoriesPage;
