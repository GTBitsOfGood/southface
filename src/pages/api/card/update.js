import { updateCardById } from "server/mongodb/actions/Card";
import { withSessionRoute } from "src/lib/utils/session";

// @route   PUT api/card/update
// @desc    Update Card Request
// @access  Public
const handler = async (req, res) => {
  try {
    const { id, card, thumbsUp, thumbsDown, imageId } = req.body;
    const updatedCard = await updateCardById(id, {
      ...card,
      thumbsUp,
      thumbsDown,
      images: card.images.map((image) => {
        if (image._id === imageId) {
          return {
            ...image,
            thumbsUp,
            thumbsDown,
          };
        } else {
          return image;
        }
      }),
    });

    return res.status(200).json({
      success: true,
      payload: updatedCard,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);

// const handler = async (req, res) => {
//   try {
//     if (req.body.isOnlyComments == true) {
//       const updatedCard = await updateCardById(req.body.id, {
//         comments: req.body.card.comments,
//       });

//       return res.status(200).json({
//         success: true,
//         payload: updatedCard,
//       });
//     }

//     const updatedCard = await updateCardById(req.body.id, {
//       ...req.body.card,
//       thumbsUp: req.body.card.thumbsUp || 0,
//       thumbsDown: req.body.card.thumbsDown || 0,
//     });

//     return res.status(200).json({
//       success: true,
//       payload: updatedCard,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export default withSessionRoute(handler);
