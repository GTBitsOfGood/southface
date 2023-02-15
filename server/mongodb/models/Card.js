import mongoose from "mongoose";

const { Schema } = mongoose;

const CardSchema = new Schema({
  images: [
    {
      type: String,
      default: [],
    },
  ],
  selectedImages: [
    {
      type: Boolean,
      required: false,
    }
  ],
  title: {
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
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
