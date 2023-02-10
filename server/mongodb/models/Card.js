import mongoose from "mongoose";

const { Schema } = mongoose;

const CardSchema = new Schema({
  images: [
    {
      type: String,
      default: [],
    },
  ],
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  comments: [
    {
      body: String,
      date: Date,
    },
  ],
  tags: [
    {
      type: String,
      default: [],
    },
  ],
  selected: {
    type: Boolean,
    default: false,
  },
  selectionIndex: {
    type: Number,
    default: 0,
  },
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
