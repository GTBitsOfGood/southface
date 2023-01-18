import {
  getCardsCount,
  getCardsPagination,
} from "../../server/mongodb/actions/Card";
import LibraryPage from "src/screens/Library";

const LibraryPageWrapper = (props) => <LibraryPage {...props} />;

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps() {
  const pageNumber = 0;
  const cards = await getCardsPagination(pageNumber);
  const cardsCount = await getCardsCount();
  let numPages = Math.floor(cardsCount / 4);

  if (cardsCount % 4 > 0) {
    numPages += 1;
  }

  return {
    props: {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
      pageNumber: pageNumber + 1,
    },
  };
}

export default LibraryPageWrapper;
