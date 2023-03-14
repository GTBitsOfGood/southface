import { IconButton } from "@chakra-ui/react";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";

const SentimentButton = (props) => {
  const styles = {
    bg: "none",
    _hover: { bg: "none" },
    w: "1.5rem",
    h: "1.5rem",
  };
  const iconStyles = {
    color: "#03acc8",
    size: "1.5em",
  };
  const Icon = props.status
    ? props.type === "like"
      ? MdThumbUp
      : MdThumbDown
    : props.type === "like"
    ? MdOutlineThumbUp
    : MdOutlineThumbDown;
  return (
    <IconButton
      icon={<Icon {...iconStyles} />}
      {...styles}
      onClick={props.onClick}
    />
  );
};

export default SentimentButton;
