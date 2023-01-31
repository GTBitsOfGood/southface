import mongoDB from "../index";
import PrimaryCategory from "../models/PrimaryCategory";

export async function createPrimaryCategory(primaryCategory) {
  await mongoDB();

  return PrimaryCategory.create(primaryCategory);
}
