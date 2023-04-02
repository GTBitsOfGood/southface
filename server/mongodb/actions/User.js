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
    isAdmin: user.isAdmin,
  };
}

export async function signUp({ username, password, isAdmin }) {
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
        isAdmin: isAdmin || false,
      })
    )
    .then((user) => {
      return {
        id: user._id,
        isAdmin: user.isAdmin,
        password: user.password,
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
      recentStandards: user?.recentStandards,
      archivedReports: user?.archivedReports,
    };
  } catch (e) {
    throw new Error("Invalid token!");
  }
};

export const getUserArchivedReports = async (id) => {
  await mongoDB();
  try {
    const user = await User.findOne({ _id: id })
      .populate("archivedReports.cards")

    if (user == null) {
      throw new Error();
    }
  

    return user.archivedReports.reverse();
  } catch (e) {
    throw new Error("Invalid token!");
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

export const updateRecentStandards = async (id, cardId) => {
  await mongoDB();

  const query = {
    _id: id,
    recentStandards: {
      $elemMatch: { cardId: { $eq: cardId } },
    },
  };
  const newData = {
    $set: {
      "recentStandards.$.timeOpened": new Date(),
    },
  };
  let result = await User.findOneAndUpdate(query, newData);
  if (result == null) {
    // standard does not exist yet in recents
    result = await User.updateOne(
      {
        _id: id,
        "recentStandards.cardId": { $ne: cardId },
      },
      {
        $push: { recentStandards: { cardId: cardId, timeOpened: new Date() } },
      }
    );
    if (result.modifiedCount == 0) {
      throw new Error("Failed to update user's recentStandards.");
    }
  }
  return result;
};
