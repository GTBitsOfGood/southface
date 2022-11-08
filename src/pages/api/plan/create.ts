import { NextApiRequest, NextApiResponse } from "next";
import { createPlan } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/utils/lib/session";

// @route   PUT api/plan/create
// @desc    Create Plan Request
// @access  Public
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const plan = await createPlan(req.body);

    return res.status(200).json({
      success: true,
      payload: plan,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
