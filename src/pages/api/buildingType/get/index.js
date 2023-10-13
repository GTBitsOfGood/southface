import { getBuildingTypes } from "server/mongodb/actions/BuildingType";
import { withSessionRoute } from "src/lib/utils/session";

// @route   GET api/buildingType/get
// @desc    Gets available building types
// @access  Public
const handler = async (req, res) => {
  try {
    const cards = await getBuildingTypes();
    return res.status(200).json({
      success: true,
      payload: cards,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
