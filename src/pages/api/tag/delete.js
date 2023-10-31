import { getCards, updateCardById } from "server/mongodb/actions/Card";
import { deleteTagById, getTagById } from "server/mongodb/actions/Tag";
import { withSessionRoute } from "src/lib/utils/session";

// @route   DELETE api/report/delete
// @desc    Delete Report Request
// @access  Public
const handler = async (req, res) => {
  try {
    let tag = await getTagById(req.body);
    if (tag && tag.length > 0) {
      tag = tag[0]
      const cards = await getCards();
      cards.forEach(async (card) => {
          if (card.tags.includes(tag.name)) {
            await updateCardById(card._id, {
              tags: card.tags.filter((name) => name != tag.name),
            });
          }
      });
    }
    await deleteTagById(req.body);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default withSessionRoute(handler);
