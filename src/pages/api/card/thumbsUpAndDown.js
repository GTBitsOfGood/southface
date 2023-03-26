import { thumbsUpAndDown } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/card/thumbsUpAndDown
// @desc    Update Card ThumbsUp Array and ThumbsDown Array
// @access  Public
const handler = async (req, res) => {
  try {
    const updatedCard = await thumbsUpAndDown(
      req.body.cardId,
      req.body.userId,
      req.body.index,
      req.body.currentlyLiked
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
