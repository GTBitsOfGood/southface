import mongoose from "mongoose";

const { Schema } = mongoose;

const ReportSchema = new Schema({
  cards: {
    type: [{ type: Schema.Types.ObjectId, ref: "Card" }],
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
