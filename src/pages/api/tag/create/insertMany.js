import { insertManyTags } from "server/mongodb/actions/Tag";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/tag/create/insertMany
// @desc    Create Many Tags
// @access  Public
const handler = async (req, res) => {
  try {
    const tag = await insertManyTags(req.body);

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
