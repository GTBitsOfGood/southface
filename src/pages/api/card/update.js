import { updateCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";

// @route   POST api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    // const userId = req.session.user.id;
    await updateCardById(req.body);

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
