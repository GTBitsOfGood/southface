import mongoose from "mongoose";

const { Schema } = mongoose;

export const primaryCategoryNames = {
  "site-planning": "Site Reporting",
  "resource-efficiency": "Resource Efficiency",
  "durability-moisture-and-management": "Durability and Moisture Management",
  "high-performance-building-envelope": "High Performance Building Envelope",
  "energy-efficient-hvac-systems": "Energy Efficient HVAC Systems",
  "indoor-air-quality": "Indoor Air Quality",
  "plumbing-and-irrigation": "Plumbing and Irrigation",
  "efficient-lighting-and-applications": "Efficient Lighting and Applications",
  "education-and-operations": "Education and Operations",
};

export const buildingTypeNames = {
  commercial: "Commercial",
  multifamily: "Multifamily",
  "single-family": "Single Family",
};

const CardSchema = new Schema({
  images: {
    type: [
      {
        imageUrl: String,
        thumbsUp: Number,
        thumbsDown: Number,
      },
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: [
      {
        body: {
          type: String,
          required: true,
        },
        userId: {
          type: String,
          required: true,
          default: "63c5be6fa7d3c693fa1d335a", // userId for testNonAdmin account
        },
        date: {
          type: Date,
          required: true,
          default: Date.now(),
        },
      },
    ],
    default: [],
  },
  criteria: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      default: [],
    },
  ],
  buildingType: [
    {
      type: String,
      required: true,
      enum: Object.keys(buildingTypeNames),
    },
  ],
  primaryCategory: [
    {
      type: String,
      required: true,
      enum: Object.keys(primaryCategoryNames),
    },
  ],
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
