import { deleteCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";
import { getUserFromId } from "server/mongodb/actions/User";

// @route   DELETE api/card/delete
// @desc    Delete Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const userId = req.session.user ? req.session.user.id : req.body.userId;
    const user = await getUserFromId(userId);
    if (user.isAdmin) {
      await deleteCardById(req.body);

      return res.status(200).json({
        success: true,
      });
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
