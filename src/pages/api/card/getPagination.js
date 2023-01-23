import { getCardsPagination } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";
import { getCardsCount } from "../../../../server/mongodb/actions/Card";

// @route   GET api/card/get
// @desc    Gets cards for a user
// @access  Public
const handler = async (req, res) => {
  try {
    const pageNumber = req.query.page - 1;
    const searchFilterString = req.query.searchFilterString
      ? req.query.searchFilterString
      : null;
    const searchFilterTags = req.query.searchFilterTags
      ? req.query.searchFilterTags.split(",")
      : null;

    const cards = await getCardsPagination(
      pageNumber,
      searchFilterString,
      searchFilterTags
    );
    const cardsCount = await getCardsCount(
      searchFilterString,
      searchFilterTags
    );

    return res.status(200).json({
      success: true,
      payload: { cards, cardsCount },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
