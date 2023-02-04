import mongoose from "mongoose";

const { Schema } = mongoose;

export const categoryNames = [
  "Site Planning (SP)",
  "Resource Efficiency (RE)",
  "Durabiliy and Moisture Management (DU)",
  "High Performance Building Envelope (BE)",
  "Energy Efficient HVAC Systems (ES)",
  "Indoor Air Quality (IAQ)",
  "Plumbing and Irrigation (PI)",
  "Efficient Lighting and Applications (LA)",
  "Education and Operations (EO)",
];

export const buildingTypeNames = ["commercial", "multifamily", "single-family"];

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
  buildingType: {
    type: String,
    enum: buildingTypeNames,
  },
  category: {
    type: String,
    enum: categoryNames,
  },
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
