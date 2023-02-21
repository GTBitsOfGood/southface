import { withSessionRoute } from "src/lib/utils/session";
import { getCardsByIds } from "../../../../server/mongodb/actions/Card";

// @route   POST api/card/getIds
// @desc    Gets cards by their ids
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    let cards;
    if (req.body) {
      let ids = req.body;
      if (!Array.isArray(ids)) {
        ids = JSON.parse(ids);
      }
      cards = await getCardsByIds(ids);
    } else {
      throw new Error("Ids not supplied in req.body to /api/card/getIds");
    }
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
