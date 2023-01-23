import { updateCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";
import { getUserFromId } from "server/mongodb/actions/User";

// @route   PUT api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    if (!req.session.user) {
      throw new Error("Not Logged In");
    }

    const userId = req.session.user.id;

    const user = await getUserFromId(userId);
    if (user.isAdmin) {
      const updatedCard = await updateCardById(req.body.id, req.body.card);

      return res.status(200).json({
        success: true,
        payload: updatedCard,
      });
    }

    if (req.body.isOnlyComments == true) {
      const updatedCard = await updateCardById(req.body.id, {
        comments: req.body.card.comments,
      });

      return res.status(200).json({
        success: true,
        payload: updatedCard,
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
