import { getUsers } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/user/getAll
// @desc    Get current user from cookie
// @access  Public
const handler = async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).json({
      success: true,
      payload: users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
