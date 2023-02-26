import { getTags } from "server/mongodb/actions/Tag";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/tag/get
// @desc    Gets all tags
// @access  Public
const handler = async (req, res) => {
  try {
    const tags = await getTags();
    return res.status(200).json({
      success: true,
      payload: tags,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
