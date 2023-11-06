import mongoDB from "../index";
import Tag from "../models/Tag";

export async function createTag({ name }) {
  await mongoDB();
  const tag = await Tag.create({ name });
  return tag;
}

export async function insertManyTags(tags) {
  await mongoDB();

  return Tag.insertMany(tags);
}

export async function getTags() {
  await mongoDB();
  const tag = await Tag.find({}).sort({ name: 1 });
  return tag;
}

export async function getTagsObject() {
  await mongoDB();
  // const tag = Tag.find().sort({ name: 1 });
  const tag = await Tag.aggregate([
    {
      $sort: {
        name: 1,
      },
    },
    {
      $group: {
        _id: { $toLower: { $substr: ["$name", 0, 1] } },
        tags: {
          $push: {
            id: "$_id",
            name: "$name",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        key: "$_id",
        tags: 1,
      },
    },
    {
      $sort: {
        key: 1,
      },
    },
    {
      $group: {
        _id: null,
        tagsByChar: {
          $push: "$$ROOT",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $arrayToObject: {
            $map: {
              input: "$tagsByChar",
              as: "charGroup",
              in: {
                k: "$$charGroup.key",
                v: "$$charGroup.tags",
              },
            },
          },
        },
      },
    },
  ]);
  return tag;
}

export async function deleteTagById(id) {
  await mongoDB();

  await Tag.findOneAndRemove({ _id: id });
}

export async function updateTagById(id, updatedTagName) {
  await mongoDB();

  const tag = await Tag.findOneAndUpdate({ _id: id }, updatedTagName);
  return tag;
}

export async function getTagById(id) {
  await mongoDB();
  const tag = await Tag.find({ _id: id });
  return tag;
}
