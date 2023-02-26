import mongoDB from "../index";
import Tag from "../models/Tag";

export async function createTag({ name }) {
  await mongoDB();
  name = name.toLowerCase();
  const tag = Tag.create({ name });
  return tag;
}

export async function getTags() {
  await mongoDB();
  const tag = Tag.find().sort({ name: 1 });
  return tag;
}
