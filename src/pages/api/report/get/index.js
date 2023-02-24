import { getReports } from "server/mongodb/actions/Report";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/report/get
// @desc    Gets reports for a user
// @access  Public
const handler = async (req, res) => {
  try {
    const reports = await getReports();
    return res.status(200).json({
      success: true,
      payload: reports,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
