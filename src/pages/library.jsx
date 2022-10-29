import {
  getCards,
  getCardsCount,
  getNextDocs,
} from "../../server/mongodb/actions/Card";
import LibraryPage from "src/screens/Library";

const LibraryPageWrapper = (props) => <LibraryPage {...props} />;

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps(context) {
  const lastCardId = context.query.lastCardId;

  const cards = await getNextDocs(4, lastCardId);
  const cardsCount = await getCardsCount();
  let numPages = Math.floor(cardsCount / 4);

  console.log("cardsCount", cardsCount);
  if (cardsCount % 4 > 0) {
    numPages += 1;
  }

  console.log("printing", lastCardId);
  console.log(cards);

  return {
    props: {
      cardsFromDatabase: JSON.parse(JSON.stringify(cards)),
      numPages,
    },
  };
}

export default LibraryPageWrapper;
