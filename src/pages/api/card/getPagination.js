import { getCardsPagination } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";
import { getCardsCount } from "../../../../server/mongodb/actions/Card";

// @route   GET api/card/get
// @desc    Gets cards for a user
// @access  Public
const handler = async (req, res) => {
  try {
    const pageNumber = req.query.page - 1;
    const searchFilter = req.query.searchFilter ? req.query.searchFilter : null;
    const cards = await getCardsPagination(pageNumber, searchFilter);
    const cardsCount = await getCardsCount(searchFilter)
    return res.status(200).json({
      success: true,
      payload: {cards, cardsCount},
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
