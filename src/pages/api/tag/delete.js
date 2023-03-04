import { deleteTagById } from "server/mongodb/actions/Tag";
import { withSessionRoute } from "src/lib/utils/session";

// @route   DELETE api/report/delete
// @desc    Delete Report Request
// @access  Public
const handler = async (req, res) => {
  try {
    await deleteTagById(req.body);

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
