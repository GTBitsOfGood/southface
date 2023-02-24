export const capitalizeAndRemoveDash = (string) => {
  return string
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const uncapitalizeAndAddDash = (string) => {
  return string.toLowerCase().replace(/ /g, "-");
};
