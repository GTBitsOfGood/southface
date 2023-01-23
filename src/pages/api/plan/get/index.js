import { getPlans } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/plan/get
// @desc    Gets plans for a user
// @access  Public
const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const plans = await getPlans(userId);
    return res.status(200).json({
      success: true,
      payload: plans,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
