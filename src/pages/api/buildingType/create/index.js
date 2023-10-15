import { createBuildingType } from "server/mongodb/actions/BuildingType";
import { withSessionRoute } from "src/lib/utils/session";

// @route   POST api/buildingType/create
// @desc    Create Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const createdType = await createBuildingType(req.body);

    return res.status(200).json({
      success: true,
      payload: createdType,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
