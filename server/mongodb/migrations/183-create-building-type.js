const mongoose = require("mongoose");
const BuildingType = require("../models/BuildingType");

const fs = require("fs");
const path = require("path");

// Adjust the path as necessary
const envPath = path.resolve(__dirname, "../../../.env.local");

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf8");

  envConfig.split("\n").forEach((line) => {
    if (line) {
      const [key, value] = line.split("=");
      if (key && value) {
        process.env[key.trim()] = value.trim();
        console.log(key.trim());
      }
    }
  });
}

async function connect() {
  if (mongoose.connections[0].readyState) return;

  console.log(process.env.DB_URL);
  if (!process.env.DB_URL || !process.env.DB_NAME) {
    throw new Error(
      "DB environmental variables are not set! Make sure to run yarn secrets"
    );
  }

  /**
   * THIS SETS WHICH DATABASE YOU ARE USING!! Choose wisely
   * either choose processs.env.DB_URL_DEV (local) || process.env.DB_URL_PRODUCTION (atlas)
   *
   *  */

  await mongoose
    .connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    })
    .catch((e) => {
      console.error("Error connecting to database.");
      throw e;
    });
}

async function createBuildingTypes() {
  const types = ["single-family", "multi-family", "commercial"]; // Update with all your building types
  for (const type of types) {
    const buildingType = new BuildingType({ name: type });
    await buildingType.save();
  }
}

connect().then(() =>
  createBuildingTypes()
    .then(() => console.log("Building types created"))
    .catch((err) => console.error("Failed to create building types", err))
);
