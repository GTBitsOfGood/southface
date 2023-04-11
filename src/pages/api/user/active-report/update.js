import { updateActiveReport } from "server/mongodb/actions/User/ActiveReport";
import { withSessionRoute } from "src/lib/utils/session";

const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const updatedActivePlan = await updateActiveReport(userId, req.body);
    return res.status(200).json({
      success: true,
      payload: updatedActivePlan,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export default withSessionRoute(handler);
