import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const ArrowIcon = ({ orientation, ...rest }) => {
  const styles = {
    pos: "absolute",
    top: "0",
    bottom: "0",
    margin: "auto 0",
    color: "white",
    bgColor: "black",
    rounded: "full",
    zIndex: 2,
    boxSize: 8,
    ...rest,
  };
  if (orientation == "right") {
    return <ChevronRightIcon {...styles} />;
  } else if (orientation == "left") {
    return <ChevronLeftIcon {...styles} />;
  }
};

export default ArrowIcon;
