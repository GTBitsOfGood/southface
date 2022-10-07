import { updateCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   PUT api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    const updatedCard = await updateCardById(req.body.id, req.body.card);

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
