import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import PaginationTab from "src/components/PaginationTab";
import SearchBar from "src/components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import {
  buildingTypeNames,
  primaryCategoryNames,
} from "src/lib/utils/constants";
import {
  capitalizeAndRemoveDash,
  uncapitalizeAndAddDash,
} from "src/lib/utils/utilFunctions";
import CurrentSearchInfo from "src/components/SearchBar/CurrentSearchInfo";
import useSearch from "src/lib/hooks/useSearch";

const LibraryCategoryPage = (props) => {
  const cardsFromDatabase = props.cardsFromDatabase;
  const numPagesInitial = props.numPages;
  const [cards, setCards] = useState(cardsFromDatabase);

  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(numPagesInitial);

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
    <Flex alignItems="stretch" flexDirection="column" p="2rem">
      <HStack w="full" position="relative">
        <Breadcrumb
          separator=">"
          fontWeight="semibold"
          position="absolute"
          top={2}
        >
          <BreadcrumbItem>
            <Link href="/library">Digital Library</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link href={`/library/${props.params.buildingType}`}>
              {props.buildingType}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Text>{props.primaryCategory}</Text>
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
        location={props.primaryCategory}
        tags={tags}
        setResetSearch={setResetSearch}
        setTagToClear={setTagToClear}
      />

      {numPages > 0 ? (
        <>
          <StandardCardTable cards={cards} setCards={setCards} />
          <PaginationTab
            numPages={numPages}
            alignSelf="center"
            border="1px solid black"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setCards={setCards}
          />
        </>
      ) : (
        <Heading my={10}>No Cards Found</Heading>
      )}
    </Flex>
  );
};

export async function getStaticProps({ params }) {
  const pageNumber = 0;
  const { buildingType, primaryCategory } = params;
  const cards = await getCardsPagination({
    pageNumber,
    buildingType: params.buildingType,
    primaryCategory: params.primaryCategory,
  });

  console.log(cards);

  const cardsCount = await getCardsCount({
    buildingType,
    primaryCategory,
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
      buildingType: buildingTypeNames[params.buildingType],
      primaryCategory: capitalizeAndRemoveDash(params.primaryCategory),
      params,
    },
  };
}

export async function getStaticPaths() {
  const paths = Object.keys(buildingTypeNames)
    .map((buildingType) => {
      return Object.keys(primaryCategoryNames).map((primaryCategoryInitial) => {
        return {
          params: {
            buildingType: buildingType,
            primaryCategory: uncapitalizeAndAddDash(
              primaryCategoryNames[primaryCategoryInitial]
            ),
          },
        };
      });
    })
    .flat();

  return {
    paths,
    fallback: false,
  };
}

export default LibraryCategoryPage;
