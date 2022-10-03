import { NextApiRequest, NextApiResponse } from "next";
import { getPlanById } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/utils/lib/session";

// @route   GET api/plan/get/[id]
// @desc    Gets a Plan by its ID
// @access  Public
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const useId = id ? (id as string) : req.body;

    const plans = await getPlanById(useId);

    return res.status(200).json({
      success: true,
      payload: plans,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
