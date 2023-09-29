const { MongoClient, ObjectId } = require("mongodb");
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
async function revertBuildingTypeUpdate2() {
  const uri = process.env.DB_URL; // Replace with your MongoDB URI
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("southface");
    const cardsCollection = database.collection("cards");

    // Step 1: Retrieve all cards
    const cards = await cardsCollection.find().toArray();

    // Step 2: Revert each card's buildingType
    for (const card of cards) {
      const { buildingType, _id, ...otherFields } = card;

      // Revert it to an empty array or your desired default value
      const revertedBuildingTypes = buildingType.map((type) => {
        if (type == "multi-family" || type == null) {
          return "multifamily";
        }
        return type;
      });

      // Update the card's buildingType field
      await cardsCollection.updateOne(
        { _id: new ObjectId(_id) },
        {
          $set: { buildingType: revertedBuildingTypes, ...otherFields },
        }
      );
    }

    console.log("Building types reverted successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}
revertBuildingTypeUpdate2();
// async function revertBuildingTypeUpdate() {
//   const uri = process.env.DB_URL; // Replace with your MongoDB URI
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const database = client.db("southface");
//     const cardsCollection = database.collection("cards");

//     // Step 1: Retrieve all cards
//     const cards = await cardsCollection.find().toArray();
//     const buildingTypesCollection = database.collection("buildingtypes");
//     const buildingTypes = await buildingTypesCollection.find().toArray();
//     // Create a mapping of buildingType names to their corresponding ObjectIds
//     const buildingTypeMap = {};
//     buildingTypes.forEach((type) => {
//       buildingTypeMap[type._id] = type.name;
//     });
//     // Step 2: Revert each card's buildingType
//     for (const card of cards) {
//       const { buildingType, _id, ...otherFields } = card;

//       // If the buildingType field is an array of ObjectIds, you can remove them here
//       // Assuming buildingType was originally an array of strings, you can revert it back to that
//       const buildingTypeNames = buildingType.map(
//         (objectId) => buildingTypeMap[objectId]
//       );

//       // Update the card's buildingType with the original array of strings
//       await cardsCollection.updateOne(
//         { _id: new ObjectId(_id) },
//         {
//           $set: { buildingType: buildingTypeNames, ...otherFields },
//         }
//       );
//     }

//     console.log("Building types reverted successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await client.close();
//     console.log("Disconnected from MongoDB");
//   }
// }

// revertBuildingTypeUpdate();

// async function updateBuildingTypes() {
//   const uri = "process.env.DB_URL"; // Replace with your MongoDB URI
//   const client = new MongoClient(uri);

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB");

//     const database = client.db("southface");
//     const cardsCollection = database.collection("cards");
//     const buildingTypesCollection = database.collection("buildingtypes");
//     console.log(buildingTypesCollection);

//     const cards = await cardsCollection.find().toArray();
//     // Step 2: Retrieve all buildingTypes
//     const buildingTypes = await buildingTypesCollection.find().toArray();

//     // Create a mapping of buildingType names to their corresponding ObjectIds
//     const buildingTypeMap = {};
//     buildingTypes.forEach((type) => {
//       buildingTypeMap[type.name] = new ObjectId(type._id);
//     });
//     // Step 2: Update each card's buildingType
//     for (const card of cards) {
//       const { buildingType, _id, ...otherFields } = card;
//       console.log(buildingType);
//       const buildingTypeIds = buildingType.map(
//         (typeName) => buildingTypeMap[typeName]
//       );
//       // Update the card's buildingType with the ObjectId
//       await cardsCollection.updateOne(
//         { _id: new ObjectId(_id) },
//         {
//           $set: { buildingType: buildingTypeIds, ...otherFields },
//         }
//       );
//     }

//     console.log("Building types updated successfully!");
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await client.close();
//     console.log("Disconnected from MongoDB");
//   }
// }

//updateBuildingTypes();
