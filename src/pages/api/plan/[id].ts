import { NextApiRequest, NextApiResponse } from "next";
import { getPlanById } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/utils/lib/session";

// NEED TO MAKE DYNAMIC SO USER CAN TYPE IN URL

// @route   GET api/plan/[id]
// @desc    Gets a Plan by its ID
// @access  Public
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cards = await getPlanById(req.body);

    return res.status(200).json({
      success: true,
      payload: cards,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
