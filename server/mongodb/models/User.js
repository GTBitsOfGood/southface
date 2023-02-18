import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  recentStandards: [
    {
      cardId: String,
      timeOpened: Date,
    },
  ],
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
