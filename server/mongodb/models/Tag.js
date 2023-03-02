import mongoose from "mongoose";

const { Schema } = mongoose;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export { TagSchema };
export default mongoose.models?.Tag ?? mongoose.model("Tag", TagSchema);
