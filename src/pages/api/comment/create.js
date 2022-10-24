import { updateCardById, getCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   POST api/comment/create
// @desc    Create Comment Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { cardId, text } = req.body;

    const comment = {
      body: text,
      date: new Date(),
    };

    const card = await getCardById(cardId);

    const newComments = card.comments.concat(comment);

    console.log(newComments);

    const updated = await updateCardById(cardId, { comments: newComments });

    return res.status(200).json({
      success: true,
      payload: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
