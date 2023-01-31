import mongoose from "mongoose";
import { CardSchema } from "./Card.js";

const { Schema } = mongoose;

const PrimaryCategorySchema = new Schema({
  name: {
    type: String,
  },
  cards: [
    {
      type: [CardSchema],
      default: [],
    },
  ],
});

export { PrimaryCategorySchema };

export default mongoose.models?.PrimaryCategory ??
  mongoose.model("PrimaryCategory", PrimaryCategorySchema);
