import { withSessionRoute } from "src/utils/lib/session";
import { getCardById, updateCardById } from "server/mongodb/actions/Card";

// @route   DELETE api/comment/delete
// @desc    Delete Comment Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { cardId, commentId } = req.body;

    const card = await getCardById(cardId);

    const newComments = card.comments.filter((c) => {
      return c._id.valueOf() !== commentId;
    });

    await updateCardById(cardId, { comments: newComments });

    return res.status(200).json({
      success: true,
      payload: newComments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
