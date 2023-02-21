import { IconButton } from "@chakra-ui/react";
import { MdOutlineThumbDownAlt, MdOutlineThumbUpAlt } from "react-icons/md";

const SentimentButton = (props) => {
  const styles = {
    bg: "none",
    _hover: { bg: "none" },
    w: "1.5rem",
    h: "1.5rem",
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

export default SentimentButton;
