import { withSessionRoute } from "src/lib/utils/session";
import { getUnpopulatedActiveReport } from "server/mongodb/actions/User/ActiveReport";

const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const activePlan = await getUnpopulatedActiveReport(userId);
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
