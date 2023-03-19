import { thumbsDown } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const updatedCard = await thumbsDown(
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
