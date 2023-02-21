import mongoose from "mongoose";
import { CardSchema } from "server/mongodb/models/Card.js";

const { Schema } = mongoose;

const PlanSchema = new Schema({
  userId: {
    type: String,
  },
  cards: {
    type: [CardSchema],
  },
  name: {
    type: String,
  },
});
export { PlanSchema };
export default mongoose.models?.Plan ?? mongoose.model("Plan", PlanSchema);
