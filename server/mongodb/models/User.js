import mongoose from "mongoose";
import { PlanSchema } from "server/mongodb/models/Plan";

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
  archivedProjectPlan: {
    type: [PlanSchema],
  },
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
