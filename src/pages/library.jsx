import { getCards } from "../../server/mongodb/actions/Card";
import LibraryPage from "src/screens/Library";

const LibraryPageWrapper = (props) => <LibraryPage {...props} />;

/**
 * Errors in getServerSideProps will display the page in 'pages/500.js' (https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)
 */
export async function getServerSideProps() {
  const cards = await getCards();
  return {
    props: {
      cards: JSON.parse(JSON.stringify(cards)),
    },
  };
}

export default LibraryPageWrapper;
