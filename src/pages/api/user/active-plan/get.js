import { getActivePlan } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const activePlan = await getActivePlan(userId);
    return res.status(200).json({
      success: true,
      payload: activePlan,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export default withSessionRoute(handler);
