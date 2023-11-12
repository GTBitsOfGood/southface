import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  useBreakpointValue,
  useTheme,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import { getCardsCount, getCardsPagination } from "server/mongodb/actions/Card";
import PaginationTab from "src/components/PaginationTab";
import SearchBar from "src/components/SearchBar";
import CurrentSearchInfo from "src/components/SearchBar/CurrentSearchInfo";
import useSearch from "src/lib/hooks/useSearch";
import { primaryCategoryNames } from "src/lib/utils/constants";
import {
  capitalizeAndRemoveDash,
  uncapitalizeAndAddDash,
} from "src/lib/utils/utilFunctions";
import StandardCardTable from "../../../../components/StandardCardTable/StandardCardTable";

const LibraryCategoryPage = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const cardsFromDatabase = props.cardsFromDatabase;
  const sortedCards = cardsFromDatabase?.slice().sort((card1, card2) => {
    return card1.title.localeCompare(card2.title);
  });
  const numPagesInitial = props.numPages;
  const [cards, setCards] = useState(sortedCards);

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

  const { flexPadding, breakpoint } = useBreakpointValue({
    base: { flexPadding: "1rem", breakpoint: "column" },
    md: { flexPadding: "2rem", breakpoint: "row" },
    lg: { flexPadding: "2rem", breakpoint: "row" },
  });

  if (router.isFallback) {
    return <div></div>;
  }

  return (
    <Flex padding={flexPadding} flexDirection="column">
      <HStack
        minWidth="max-content"
        alignItems="flex-start"
        gap="2"
        flexDirection={breakpoint}
      >
        <Flex p="2">
          <Breadcrumb separator="/" fontWeight="semibold">
            <BreadcrumbItem
              style={{
                color: theme.colors.lightGrey,
                fontFamily: theme.fonts.heading,
                fontWeight: theme.fonts.regular,
              }}
            >
              <Link href="/library">Digital Library</Link>
            </BreadcrumbItem>
            <BreadcrumbItem
              style={{
                color: theme.colors.lightGrey,
                fontFamily: theme.fonts.heading,
                fontWeight: theme.fonts.regular,
              }}
            >
              <Link href={`/library/${props.params.buildingType}`}>
                {props.buildingType}
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem
              style={{
                color: theme.colors.boldGrey,
                fontFamily: theme.fonts.headingBold,
                fontWeight: theme.fonts.bold,
              }}
            >
              <Text>{props.primaryCategory}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Spacer />
        <Flex>
          <SearchBar
            pageType={props.primaryCategory}
            handleSearch={handleSearch}
            resetSearch={resetSearch}
            tagToClear={tagToClear}
            setTagToClear={setTagToClear}
            setResetSearch={setResetSearch}
          />
        </Flex>
      </HStack>

      <Text
        fontSize="32px"
        fontFamily={theme.fonts.body}
        margin="10px"
        color={theme.colors.Grey}
      >
        {props.primaryCategory}
      </Text>

      <CurrentSearchInfo
        handleSearch={handleSearch}
        searchString={searchString}
        location={props.primaryCategory}
        tags={tags}
        setResetSearch={setResetSearch}
        setTagToClear={setTagToClear}
      />

      {numPages > 0 ? (
        <Flex>
          <StandardCardTable cards={cards} setCards={setCards} filteredTags={tags}/>
        </Flex>
      ) : (
        <div>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            paddingX="14rem"
            paddingY="8rem"
            marginX="8rem"
          >
            <Text
              fontSize="2xl"
              textAlign="center"
              mb={5}
              color={theme.colors.boldGrey}
              fontWeight="400"
              fontFamily={theme.fonts.heading}
            >
              Sorry! We couldn&apos;t find any standards matching your search.
              Try changing your spelling, removing filters, or searching for
              something else.
            </Text>
            <Link href={`/library/${props.params.buildingType}`}>
              <Button
                variant="Blue"
                size="md"
                fontFamily={theme.fonts.headingBold}
                fontWeight="700"
                fontSize="16px"
              >
                Return to {capitalizeAndRemoveDash(props.params.buildingType)}
              </Button>
            </Link>
          </Flex>
        </div>
      )}

      {numPages > 0 && (
        <Flex marginTop="16px" justifyContent="center" alignItems="center">
          <PaginationTab
            numPages={numPages}
            border="1px solid black"
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            alignItems="center"
            setCards={setCards}
          />
        </Flex>
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
      buildingType: capitalizeAndRemoveDash(params.buildingType),
      primaryCategory: capitalizeAndRemoveDash(params.primaryCategory),
      params,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const buildingTypes = await getBuildingTypes();
  const buildingTypeNames = buildingTypes.map(
    (buildingType) => buildingType.name
  );
  const paths = buildingTypeNames
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
    fallback: true,
  };
}

export default LibraryCategoryPage;
