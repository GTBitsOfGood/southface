import mongoose from "mongoose";
import { CardSchema } from "./Card";

const { Schema } = mongoose;

const PlanSchema = new Schema({
  cards: {
    type: [CardSchema],
  },
  comments: {
    type: String,
  },
});

export default mongoose.models?.Plan ?? mongoose.model("Plan", PlanSchema);
