import { updateTagById } from "server/mongodb/actions/Tag";
import { withSessionRoute } from "src/lib/utils/session";

// @route   POST api/report/update
// @desc    Update Report Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { id, name } = req.body;
    const tag = await updateTagById(id, name);

    return res.status(200).json({
      success: true,
      payload: tag,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
