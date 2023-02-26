import mongoDB from "../index";
import User from "../models/User";

export const getActivePlan = async (userId) => {
  await mongoDB();
  try {
    const user = await User.findById(userId);
    if (user == null) {
      throw new Error();
    }
    return user.activePlan;
  } catch (e) {
    console.log(e);
  }
};

export const addToActivePlan = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { "activePlan.cards": card },
      },
      { upsert: true }
    );
    if (user == null) {
      throw new Error();
    }
    return user.activePlan;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromActivePlan = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { "activePlan.cards": { _id: card._id } },
    });
    if (user == null) {
      throw new Error();
    }
    return user.activePlan;
  } catch (e) {
    console.log(e);
  }
};

export const changeInActivePlan = async (userId, card) => {
  await mongoDB();
  try {
    const user = await User.findById(userId);
    if (user == null) {
      throw new Error();
    }
    const arr = user.activePlan.cards;
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]._id);
      if (arr[i]._id.toString() === card._id) {
        console.log("match made");
        arr[i] = card;
        arr[i].title = "bruh";
        break;
      }
    }
    user.activePlan.cards = arr;
    const updatedUser = await user.save();
    return updatedUser;
  } catch (e) {
    console.log(e);
  }
};

export const updateActivePlan = async (userId, plan) => {
  await mongoDB();
  try {
    const user = await User.findByIdAndUpdate(userId, {
      $set: { activePlan: plan },
    });
    if (user == null) {
      throw new Error();
    }
    return user.activePlan;
  } catch (e) {
    console.log(e);
  }
};

export const getUsers = async () => {
  await mongoDB();

  return User.find({});
};

export const deleteUserById = async (id) => {
  await mongoDB();

  return User.findOneAndRemove({ _id: id });
};
