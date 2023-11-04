import mongoDB from "../index";
import BuildingType from "../models/BuildingType";
import Card from "../models/Card";

export async function createBuildingType(type) {
  await mongoDB();

  const newType = await BuildingType.create(type);

  return newType;
}

export async function updateBuildingTypeById(id, updatedType) {
  await mongoDB();

  await BuildingType.findOneAndUpdate({ _id: id }, updatedType);
}

export async function deleteBuildingTypeById(id) {
  await mongoDB();

  const type = await BuildingType.findOneAndRemove(
    { _id: id },
    { select: "name" }
  );
  const name = type.name;

  await Card.updateMany(
    { buildingType: name },
    { $pull: { buildingType: name } }
  );

  await Card.deleteMany({ buildingType: { $size: 0 } });
}

export async function getBuildingTypeById(id) {
  await mongoDB();

  const type = await BuildingType.find({ _id: id });

  return type;
}

export async function getBuildingTypes() {
  await mongoDB();

  return BuildingType.find({});
}
