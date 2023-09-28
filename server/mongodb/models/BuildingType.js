import mongoose from "mongoose";

const { Schema } = mongoose;

const BuildingTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
export { BuildingTypeSchema };
export default mongoose.models?.BuildingType ??
  mongoose.model("BuildingType", BuildingTypeSchema);
