import { createCard } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

// @route   POST api/card/create
// @desc    Create Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const createdCard = await createCard(req.body);

    return res.status(200).json({
      success: true,
      payload: createdCard,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
