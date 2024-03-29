import { thumbsUp } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/card/thumbsUp
// @desc    Update Card ThumbsUp Array
// @access  Public
const handler = async (req, res) => {
  try {
    const updatedCard = await thumbsUp(
      req.body.cardId,
      req.body.userId,
      req.body.index,
      req.body.shouldPush
    );

    return res.status(200).json({
      success: true,
      payload: updatedCard,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
