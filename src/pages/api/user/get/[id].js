import { getUserFromId } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/report/get/[id]
// @desc    Gets a Report by its ID
// @access  Public
const handler = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await getUserFromId(id);

    return res.status(200).json({
      success: true,
      payload: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
