import mongoose from "mongoose";
import { ReportSchema } from "server/mongodb/models/Report";

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
    required: true,
  },
  archivedReports: {
    type: [ReportSchema], // this is embedded
  },
  recentStandards: [
    {
      cardId: String,
      timeOpened: Date,
    },
  ],
  activeReport: {
    type: [ReportSchema],
    required: false,
  }
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
