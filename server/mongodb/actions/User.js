import bcrypt from "bcryptjs";
import mongoDB from "../index";
import User from "../models/User";

export async function login({ username, password }) {
  if (username == null || password == null) {
    throw new Error("All parameters must be provided!");
  }
  await mongoDB();

  const user = await User.findOne({ username });

  if (user != null) {
    const didMatch = await bcrypt.compare(password, user.password);

    if (!didMatch) {
      throw new Error("The password you entered is incorrect!");
    }
  } else {
    throw new Error("User does not exist!");
  }

  return {
    id: user._id,
  };
}

export async function signUp({ username, password }) {
  if (username == null || password == null) {
    throw new Error("All parameters must be provided!");
  }

  await mongoDB();

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({
        username,
        password: hashedPassword,
        isAdmin: false,
      })
    )
    .then((user) => {
      return {
        id: user._id,
      };
    });
}

export const getUserFromId = async (id) => {
  await mongoDB();
  try {
    const user = await User.findOne({ _id: id });

    if (user == null) {
      throw new Error();
    }

    return {
      id,
      username: user.username,
      isAdmin: user.isAdmin,
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
};

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
