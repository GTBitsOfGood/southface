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
  comments: [{ 
    body: String, 
    date: Date
  }],
  tags: [{
    type: String,
    default: [],
  }]
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
