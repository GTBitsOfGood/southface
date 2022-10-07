import { updateCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";
import { getUserFromId } from "server/mongodb/actions/User";

// @route   POST api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await getUserFromId(userId);
    if (user.isAdmin) {
      await updateCardById(req.body);

      return res.status(200).json({
        success: true,
      });
    } else {
      throw new Error("You do not have permission to do this action!");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
