import mongoose from "mongoose";
import { CardSchema } from "server/mongodb/models/Card.js";

const { Schema } = mongoose;

const ReportSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cards: {
    type: [CardSchema],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
export { ReportSchema };
export default mongoose.models?.Report ??
  mongoose.model("Report", ReportSchema);
