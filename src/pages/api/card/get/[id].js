import { withSessionRoute } from "src/lib/utils/session";
import { getCardById } from "server/mongodb/actions/Card";

// @route   GET api/card/get/[id]
// @desc    Gets cards for a user
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    const { id } = req.query;

    const card = await getCardById(id);
    return res.status(200).json({
      success: true,
      payload: card,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
