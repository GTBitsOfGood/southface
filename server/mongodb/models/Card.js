import mongoose from "mongoose";

const { Schema } = mongoose;

export const CardSchema = new Schema({
  imageSrc: {
    type: String,
  },
  title: {
    type: String,
  },
  comments: {
    type: [String],
  },
  tags: {
    type: [String],
  }
});

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
