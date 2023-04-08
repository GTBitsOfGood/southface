import { deleteArchivedReport } from "server/mongodb/actions/User/ArchivedReport";
import { withSessionRoute } from "src/lib/utils/session";

const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;

    const response = await deleteArchivedReport(userId, req.body);

    return res.status(200).json({
      success: true,
      payload: response,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export default withSessionRoute(handler);
