import mongoose from "mongoose";

const { Schema } = mongoose;

const CardSchema = new Schema({
  images: [{
    type: String,
    default: [],
  }],
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  tags: [{
    type: String,
    default: [],
  }]
});

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
