import mongoDB from "../../index";
import User from "../../models/User";

export const addToArchivedReport = async (userId, cards, name) => {
  try {
    await mongoDB();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          archivedReports: { cards: cards, name: name, date: new Date() },
        },
      },
      { upsert: true }
    );

    if (user == null) {
      throw new Error();
    }

    return user.archivedReports;
  } catch (e) {
    console.log(e);
  }
};

export const deleteArchivedReport = async (userId, reportId) => {
  try {
    await mongoDB();

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { archivedReports: { _id: reportId } },
      },
      { upsert: true }
    );

    if (user == null) {
      throw new Error();
    }

    return user.archivedReports;
  } catch (e) {
    console.log(e);
  }
};
