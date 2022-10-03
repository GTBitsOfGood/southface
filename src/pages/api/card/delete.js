import { deleteCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   DELETE api/card/delete
// @desc    Delete Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    await deleteCardById(req.body);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);