import mongoDB from "../../index";
import User from "../../models/User";

const populateString = "activeReport.cards.card";

const removeNullCards = (report) => {
  report.cards = report.cards.filter(card => card.card !== null);
  return report;
}

export const getActiveReport = async (userId) => {
  try {
    await mongoDB();
    const user = await User.findById(userId).populate({ path: populateString });
    if (user == null) {
      throw new Error();
    }
    return removeNullCards(user.activeReport);
  } catch (e) {
    console.log(e);
  }
};

export const getUnpopulatedActiveReport = async (userId) => {
  try {
    await mongoDB();
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
  try {
    await mongoDB();
    const newWrappedCard = [
      {
        card: card._id,
        imgSelections: Array(card.images.length).fill(true),
        noteSelections: Array(card.notes.length).fill(true),
      },
    ];
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { "activeReport.cards": newWrappedCard },
      },
      { upsert: true }
    ).populate(populateString);
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromActiveReport = async (userId, card) => {
  try {
    await mongoDB();
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { "activeReport.cards": { card: card._id } },
    }).populate(populateString);
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const changeInActiveReport = async (userId, wrappedCard) => {
  try {
    await mongoDB();
    const newWrappedCard = [
      {
        card: wrappedCard.card._id,
        imgSelections: wrappedCard.imgSelections,
        noteSelections: wrappedCard.noteSelections,
      },
    ];
    const user = await User.findOneAndUpdate(
      { _id: userId, "activeReport.cards.card": wrappedCard.card._id },
      { $set: { "activeReport.cards.$": newWrappedCard } }
    ).populate(populateString);
    if (user == null) {
      throw new Error();
    }
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};

export const updateActiveReport = async (userId, plan) => {
  try {
    await mongoDB();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { activeReport: plan },
      },
      { upsert: true }
    ).populate(populateString);
    if (user == null) {
      throw new Error();
    }
    // console.log(user.activeReport);
    return user.activeReport;
  } catch (e) {
    console.log(e);
  }
};
