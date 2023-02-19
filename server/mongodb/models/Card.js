import mongoose from "mongoose";

const { Schema } = mongoose;

const primaryCategoryNames = {
  SP: "Site Planning",
  RE: "Resource Efficiency",
  DU: "Durability and Moisture Management",
  BE: "High Performance Building Envelope",
  ES: "Energy Efficient HVAC Systems",
  IAQ: "Indoor Air Quality",
  PI: "Plumbing and Irrigation",
  LA: "Efficient Lighting and Applications",
  EO: "Education and Operations",
};

const buildingTypeNames = {
  commercial: "Commercial",
  multifamily: "Multifamily",
  "single-family": "Single Family",
};

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
  criteria: {
    type: String,
  },
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
    enum: Object.keys(buildingTypeNames),
  },
  primaryCategory: {
    type: String,
    enum: Object.keys(primaryCategoryNames),
  },
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
