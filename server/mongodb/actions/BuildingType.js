import mongoDB from "../index";
import BuildingType from "../models/BuildingType";
import PrimaryCategory from "../models/PrimaryCategory";
import { createPrimaryCategory } from "./PrimaryCategory";

export async function createBuildingType(buildingType) {
  await mongoDB();

  return BuildingType.create(buildingType);
}

export async function createDefaultBuildingTypes() {
  await mongoDB();

  const defaultTypes = [
    {
      name: "multifamily",
      primaryCategories: [
        "Site Planning (SP)",
        "Resource Efficiency (RE)",
        "Durability and Moisture Management (DU)",
        "High-Performance Building Envelope (BE)",
        "Energy Efficient HVAC Systems (ES)",
        "Indoor Air Quality (IAQ)",
        "Plumbing and Irrigation (PI)",
        "Efficient Lighting and Appliances (LA)",
        "Education and Operations (EO)",
      ],
    },
    {
      name: "singleFamily",
      primaryCategories: [
        "Site Planning (SP)",
        "Resource Efficiency (RE)",
        "Durability and Moisture Management (DU)",
        "High-Performance Building Envelope (BE)",
        "Energy Efficient HVAC Systems (ES)",
        "Indoor Air Quality (IAQ)",
        "Plumbing and Irrigation (PI)",
        "Efficient Lighting and Appliances (LA)",
        "Education and Operations (EO)",
      ],
    },
    {
      name: "commercial",
      primaryCategories: [
        "Site Planning (SP)",
        "Resource Efficiency (RE)",
        "Durability and Moisture Management (DU)",
        "High-Performance Building Envelope (BE)",
        "Energy Efficient HVAC Systems (ES)",
        "Indoor Air Quality (IAQ)",
        "Plumbing and Irrigation (PI)",
        "Efficient Lighting and Appliances (LA)",
        "Education and Operations (EO)",
      ],
    },
  ];

  for (let type of defaultTypes) {
    if (!(await BuildingType.exists({ name: type.name }))) {
      let existingCategories = [];
      let needToCreateCategories = [];
      for (let categoryName of type.primaryCategories) {
        const foundCategory = await PrimaryCategory.findOne({
          name: categoryName,
        });
        if (foundCategory) {
          existingCategories.push(foundCategory);
        } else {
          needToCreateCategories.push({ name: categoryName });
        }
      }
      let newCategories = await createPrimaryCategory(needToCreateCategories);
      console.log("existing", existingCategories);
      console.log("new", newCategories);
      console.log("both", [...newCategories, ...existingCategories]);
      await createBuildingType({
        name: type.name,
        primaryCategories: [...newCategories, ...existingCategories],
      });
    }
  }
}
