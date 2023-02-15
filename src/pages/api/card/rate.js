import { thumbDownCard, thumbUpCard } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

const handler = async (req, res) => {
  try {
    const { id, action } = req.body;

    if (action === "thumbUp") {
      const updatedCard = await thumbUpCard(id);
      return res.status(200).json({
        success: true,
        payload: updatedCard,
      });
    } else if (action === "thumbDown") {
      const updatedCard = await thumbDownCard(id);
      return res.status(200).json({
        success: true,
        payload: updatedCard,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid action specified.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
