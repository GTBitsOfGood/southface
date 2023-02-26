import { Breadcrumb, BreadcrumbItem, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import PaginationTab from "src/components/PaginationTab";
import SearchBar, { useSearch } from "src/components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import {
  buildingTypeNames,
  primaryCategoryNames
} from "src/lib/utils/constants";
import {
  capitalizeAndRemoveDash,
  uncapitalizeAndAddDash
} from "src/lib/utils/utilFunctions";

const LibraryCategoryPage = (props) => {
  const cardsFromDatabase = props.cardsFromDatabase;
  const numPagesInitial = props.numPages;
  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(numPagesInitial);
  const { handleSearch } = useSearch(
    cardsFromDatabase,
    setNumPages,
    setCurrentPage,
    setCards
  );

  // This is needed for editing the card (otherwise modal opens with inconsistent cards)
  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  return isRefresehing ? (
    ""
  ) : (
    <Flex alignItems="stretch" flexDirection="column" p="2rem">
      <Breadcrumb separator=">" fontWeight="semibold" pb="5">
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

      <SearchBar handleSearch={handleSearch} />

      <StandardCardTable cards={cards} setCards={setCards} />

      <PaginationTab
        numPages={numPages}
        alignSelf="center"
        border="1px solid black"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setCards={setCards}
        setIsRefreshing={setIsRefreshing}
      />
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
