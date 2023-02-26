import mongoDB from "../../index";
import User from "../../models/User";

export const getActiveReport = async (userId) => {
  await mongoDB();
  try {
    const user = await User.findById(userId);
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const addToActiveReport = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { "activeReport.cards": card },
      },
      { upsert: true }
    );
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromActiveReport = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { "activeReport.cards": { _id: card._id } },
    });
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const changeInActiveReport = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.updateOne(
      { _id: userId },
      { $set: { "activeReport.cards.$[_id]": card } },
      { arrayFilters: [{ _id: card._id }] }
    );
    if (user == null) {
      throw new Error();
    }
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const updateActiveReport = async (userId, plan) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { activeReport: plan },
    });
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};
