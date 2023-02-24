import { getReportById } from "server/mongodb/actions/Report";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/report/get/[id]
// @desc    Gets a Report by its ID
// @access  Public
const handler = async (req, res) => {
  try {
    const { id } = req.query;

    const useId = id ? id : req.body;

    const reports = await getReportById(useId);

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
