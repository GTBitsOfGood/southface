import mongoose from "mongoose";
import {
  buildingTypeNames,
  primaryCategoryNames,
} from "../../../src/lib/utils/constants";

const { Schema } = mongoose;

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
      enum: Object.values(buildingTypeNames),
    },
  ],
  primaryCategory: [
    {
      type: String,
      required: true,
      enum: Object.values(primaryCategoryNames),
    },
  ],
});

export { CardSchema };

export default mongoose.models?.Card ?? mongoose.model("Card", CardSchema);
