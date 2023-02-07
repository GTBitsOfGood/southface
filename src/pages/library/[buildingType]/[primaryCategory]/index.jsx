import { Breadcrumb, BreadcrumbItem, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PaginationTab from "src/components/PaginationTab";
import SearchBar, { useSearch } from "src/components/SearchBar";
import StandardCardTable from "src/components/StandardCardTable";
import {
  getCardsCount,
  getCardsPagination,
} from "server/mongodb/actions/Card";
import {
  buildingTypeNames,
  primaryCategoryNames,
} from "src/lib/utils/constants";
import { getCards } from "../../../../actions/Card";

const LibraryCategoryPage = (props) => {
  const cardsFromDatabase = props.cardsFromDatabase;
  const numPagesInitial = props.numPages;
  const router = useRouter();
  const [cards, setCards] = useState(cardsFromDatabase);
  const [isRefresehing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(numPagesInitial);
  const [buildingType, setBuildingType] = useState("");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const { handleSearch } = useSearch(
    cardsFromDatabase,
    setNumPages,
    setCurrentPage,
    setCards
  );

  // Without this useEffect, it opens modals for inconsistent cards with regards to pagination.
  useEffect(() => {
    setIsRefreshing(false);
  }, [cards]);

  useEffect(() => {
    if (
      !(
        Object.keys(buildingTypeNames).includes(props.buildingType) &&
        Object.keys(primaryCategoryNames).includes(
          props.primaryCategory.toUpperCase()
        )
      )
    ) {
      router.push("/");
    }
    setBuildingType(buildingTypeNames[props.buildingType]);
    setPrimaryCategory(
      primaryCategoryNames[props.primaryCategory.toUpperCase()]
    );
  }, [router, buildingType, props.buildingType, props.primaryCategory]);

  return isRefresehing ? (
    ""
  ) : (
    <Flex alignItems="stretch" flexDirection="column">
      <Heading fontSize={{ base: "4xl", lg: "5xl" }} pb="5">
        {" "}
        Library
      </Heading>
      <Breadcrumb separator=">" fontWeight="semibold" pb="5">
        <BreadcrumbItem>
          <Link href="/library">Digital Library</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href={`/library/${props.buildingType}`}>{buildingType}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <p>{primaryCategory}</p>
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

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
LibraryCategoryPage.getInitialProps = async (context) => {
  const req = context.req;
  if (req) {
    const pageNumber = 0;
    const cards = await getCardsPagination(pageNumber);
    const cardsCount = await getCardsCount();
    let numPages = Math.floor(cardsCount / 4);
  
    if (cardsCount % 4 > 0) {
      numPages += 1;
    }
  
    return {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
      pageNumber: pageNumber + 1,
      ...context.query,
    };
  } else {
      const pageNumber = 0;
      const cards = await getCards();
      const cardsCount = cards.length;
      let numPages = Math.floor(cardsCount / 4);
    
      if (cardsCount % 4 > 0) {
        numPages += 1;
      }
    
      return {
        cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
        numPages,
        pageNumber: pageNumber + 1,
        ...context.query,
      };
  }
};

export default LibraryCategoryPage;
