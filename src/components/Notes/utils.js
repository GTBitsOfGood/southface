export const formatNoteDateString = (date) => {
  const dateAsArr = new Date(date).toDateString().split(" ");

  return dateAsArr[1] + " " + dateAsArr[2] + ", " + dateAsArr[3];
};
