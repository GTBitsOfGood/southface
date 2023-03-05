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
    required: false,
    type: {
      cards: [{
        card: {
          type: Schema.Types.ObjectId,
          ref: "Card",
        },
        imgSelections: {
          type: [Boolean],
        },
        noteSelections: {
          type: [Boolean],
        },
      }],
      name: {
        type: String,
        required: true,
      },
    },
  },
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
