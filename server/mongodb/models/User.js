import mongoose from "mongoose";
import { PlanSchema } from "./Plan";

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
  activePlan: {
    type: PlanSchema,
    required: false,
  },
});

export default mongoose.models?.User ?? mongoose.model("User", UserSchema);
