import { NextApiRequest, NextApiResponse } from "next";
import { deletePlanById } from "server/mongodb/actions/Plan";
import { withSessionRoute } from "src/utils/lib/session";

// @route   DELETE api/plan/delete
// @desc    Delete Plan Request
// @access  Public
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await deletePlanById(req.body);

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
