import mongoose from "mongoose";

const { Schema } = mongoose;

const CardSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  imageSrc: {
    type: String,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  tags: [{
    type: String,
  }]
});

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
