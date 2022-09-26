import mongoose from "mongoose";

const { Schema } = mongoose;

const PlanSchema = new Schema({
  cards: {
    type: String
  }, 
  comments: {
    type: String
  }
});

export default mongoose.models?.Plan ?? mongoose.model("Plan", PlanSchema);
