import { updateRecentStandards } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PATCH api/user/standards/update
// @desc    Updates RecentStandards to have a standard's id stored with timestamp of the time opened
// @access  Public
const handler = async (req, res) => {
  try {
    const { id, standardId } = req.query;

    const useId = id ? id : req.body.id;
    const useStandardId = standardId ? useStandardId : req.body.standardId;

    const standards = await updateRecentStandards(useId, useStandardId);

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
