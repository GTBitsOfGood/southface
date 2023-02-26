import { createReport } from "server/mongodb/actions/Report";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/report/create
// @desc    Create Report Request
// @access  Public
const handler = async (req, res) => {
  try {
    const report = await createReport(req.body);

    return res.status(200).json({
      success: true,
      payload: report,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
