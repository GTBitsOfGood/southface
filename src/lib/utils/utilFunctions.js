export const capitalizeAndRemoveDash = (string) => {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const uncapitalizeAndAddDash = (string) => {
  return string.toLowerCase().replace(/ /g, "-");
};

/**
 * Takes in array of building types and array of primary categories
 * and returns a single array of those paths
 */
export const parseNestedPaths = (
  prefix = "",
  buildingTypes,
  primaryCategories
) => {
  const paths = [];
  for (let i = 0; i < buildingTypes.length; i++) {
    for (let j = 0; j < primaryCategories.length; j++) {
      const path = `/${prefix}/${buildingTypes[i]}/${primaryCategories[j]}`;
      paths.push(path);
    }
  }

  return paths;
};
