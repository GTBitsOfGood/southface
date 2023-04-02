import { addToArchivedReport } from "server/mongodb/actions/User/ArchivedReport";
import { updateActiveReport } from "server/mongodb/actions/User/ActiveReport";
import { withSessionRoute } from "src/lib/utils/session";

const handler = async (req, res) => {
  try {
    const userId = req.session.user.id;

    if (req.body.cards) {
       const formattedArchivedReport = req.body.cards.map((cardObject) => {
         return cardObject.card;
       });

       await addToArchivedReport(
         userId,
         formattedArchivedReport
       );
    }
   
    await updateActiveReport(userId, []);
    
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

export default withSessionRoute(handler);
