import mongoose from "mongoose";
import { PrimaryCategorySchema } from "./PrimaryCategory";

const { Schema } = mongoose;

const BuildingTypeSchema = new Schema({
  name: {
    type: String,
  },
  primaryCategories: [
    {
      type: [PrimaryCategorySchema],
      default: [],
    },
  ],
});

export { BuildingTypeSchema };

export default mongoose.models?.BuildingType ??
  mongoose.model("BuildingType", BuildingTypeSchema);
