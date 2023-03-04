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
  // const tag = Tag.find().sort({ name: 1 });
  const tag = Tag.aggregate([
    {
      $group: {
        _id: { $substr: ["$name", 0, 1] },
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
