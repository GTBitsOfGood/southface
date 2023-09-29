import mongoDB from "../index";
const mongoose = require("mongoose");
const Card = require("./models/Card");
const BuildingType = require("./models/BuildingType");

async function runMigration() {
  await mongoDB();
  const buildingTypes = await BuildingType.find();
  for (const buildingType of buildingTypes) {
    const cards = await Card.find({ buildingType: buildingType.name });
    for (const card of cards) {
      card.buildingType = buildingType._id;
      await card.save();
    }
  }
}

runMigration()
  .then(() => console.log("Migration completed"))
  .catch((err) => console.error("Migration failed", err))
  .finally(() => mongoose.connection.close());
