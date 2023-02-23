import { updateReportById } from "server/mongodb/actions/Report";
import { withSessionRoute } from "src/lib/utils/session";

// @route   POST api/report/update
// @desc    Update Report Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { id, report } = req.body;
    await updateReportById(id, report);

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
