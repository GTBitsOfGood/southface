import mongoDB from "../index";
const BuildingType = require("./models/BuildingType");

async function createBuildingTypes() {
  await mongoDB();
  const types = ["single-family", "multi-family", "commercial"]; // Update with all your building types
  for (const type of types) {
    const buildingType = new BuildingType({ name: type });
    await buildingType.save();
  }
}

createBuildingTypes()
  .then(() => console.log("Building types created"))
  .catch((err) => console.error("Failed to create building types", err));
