import { getCardsPagination } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   GET api/card/get
// @desc    Gets cards for a user
// @access  Public
const handler = async (req, res) => {
  try {
    const pageNumber = req.query.page - 1;
    const cards = await getCardsPagination(pageNumber);
    return res.status(200).json({
      success: true,
      payload: cards,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
