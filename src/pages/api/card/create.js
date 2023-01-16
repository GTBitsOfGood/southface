import { createCard } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/utils/lib/session";
import { getUserFromId } from "server/mongodb/actions/User";

// @route   POST api/card/create
// @desc    Create Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    if (!req.session.user) {
      throw new Error("Not Logged In");
    }

    const userId = req.session.user ? req.session.user.id : req.body.userId;
    const user = await getUserFromId(userId);
    if (user.isAdmin) {
      const createdCard = await createCard(req.body);

      return res.status(200).json({
        success: true,
        payload: createdCard,
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
