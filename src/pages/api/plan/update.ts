import { NextApiRequest, NextApiResponse } from "next";
import { updatePlanById } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/utils/lib/session";

// @route   POST api/plan/update
// @desc    Update Plan Request
// @access  Public
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, plan } = req.body;
    await updatePlanById(id, plan);

    return res.status(200).json({
      success: true,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
