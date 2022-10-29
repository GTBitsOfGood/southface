import mongoose from "mongoose";
import { Card } from "src/utils/types.ts";

const { Schema } = mongoose;

const PlanSchema = new Schema({
  userId: {
    type: String,
  },
  cards: {
    type: [Card],
  }, 
  name: {
    type: String,
  },
});

export default mongoose.models?.Plan ?? mongoose.model("Plan", PlanSchema);
