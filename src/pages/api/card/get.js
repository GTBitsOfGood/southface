import { getCards } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   GET api/card/get
// @desc    Gets cards for a user
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    const cards = await getCards();

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
