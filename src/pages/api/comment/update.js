import { withSessionRoute } from "src/utils/lib/session";
import { getCardById, updateCardById } from "server/mongodb/actions/Card";

// @route   POST api/comment/update
// @desc    Update Comment Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { cardId, commentId, text } = req.body;

    const card = await getCardById(cardId);

    let newComment = {};

    const newComments = card.comments.filter((c) => {
      if (c._id.valueOf() === commentId) {
        c.body = text;
        newComment = c;
      }
      return c;
    });

    await updateCardById(cardId, { comments: newComments });

    return res.status(200).json({
      success: true,
      payload: newComment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
