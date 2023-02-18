import { IconButton } from "@chakra-ui/react";
import { MdOutlineThumbDownAlt, MdOutlineThumbUpAlt } from "react-icons/md";

export const formatNoteDateString = (date) => {
  const dateAsArr = new Date(date).toDateString().split(" ");

  return dateAsArr[1] + " " + dateAsArr[2] + ", " + dateAsArr[3];
};

export const SentimentButton = (props) => {
  const styles = {
    bg: "none",
    _hover: { bg: "none" },
    w: "24px",
    h: "24px",
    minWidth: "auto",
    minH: "auto",
  };
  if (props.type == "like") {
    return (
      <IconButton icon={<MdOutlineThumbUpAlt color="#03acc8" />} {...styles} />
    );
  } else if (props.type == "dislike") {
    return (
      <IconButton
        icon={<MdOutlineThumbDownAlt color="#03acc8" />}
        {...styles}
      />
    );
  }
};
