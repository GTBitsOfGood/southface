import { getUserArchivedReports } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/user
// @desc    Get current user from cookie
// @access  Public
const handler = async (req, res) => {
  const id = req.session.user?.id || req.query.userId;
  try {
    const archivedReports = await getUserArchivedReports(id);
    return res.status(200).json({
      success: true,
      payload: {
        archivedReports,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
