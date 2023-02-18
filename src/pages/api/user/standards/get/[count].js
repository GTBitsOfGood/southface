import { withSessionRoute } from "src/lib/utils/session";
import { getRecentStandards } from "../../../../../../server/mongodb/actions/User";

// @route   GET api/user/standards/get/[count]
// @desc    Gets a COUNT amount of recent standards on a user with its ID
// @access  Public
const handler = async (req, res) => {
  try {
    const { id, count } = req.query;

    const useId = id ? id : req.body.id;
    const useCount = count ? count : req.body.count;

    const standards = await getRecentStandards(useId, useCount);

    return res.status(200).json({
      success: true,
      payload: standards,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
