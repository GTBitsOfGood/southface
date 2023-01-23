import { deleteUserById } from "server/mongodb/actions/User";
import { withSessionRoute } from "src/lib/utils/session";

// @route   DELETE api/user/getAll
// @desc    Delete user by id
// @access  Public
const handler = async (req, res) => {
  try {
    const id = req.query.id;

    const response = await deleteUserById(id);

    if (response === null) {
      throw new Error("User not found.");
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
