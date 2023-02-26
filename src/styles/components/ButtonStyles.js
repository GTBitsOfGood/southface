const generateButtonStyles = (color, hoverColor, activeColor) => {
  const hoverState = {
    transition: "0.1s ease-in-out",
    bgColor: hoverColor,
    color: "white",
  };
  const activeState = {
    transition: "0.1s ease-in-out",
    bgColor: activeColor,
    color: "white",
  };

  return {
    [color]: {
      bg: color,
      transition: "0.1s ease-in-out",
      _hover: hoverState,
      _active: activeState,
    },

    [`${color}-outlined`]: {
      bg: "white",
      border: "1px solid",
      color: color,
      borderColor: color,
      transition: "0.1s ease-in-out",
      _hover: hoverState,
      _active: activeState,
    },

    [`${color}-rounded`]: {
      bg: color,
      rounded: "3xl",
      _hover: hoverState,
      _active: activeState,
    },

    [`${color}-outlined-rounded`]: {
      bg: "white",
      border: "1px solid",
      color: color,
      borderColor: color,
      rounded: "3xl",
      _hover: hoverState,
      _active: activeState,
    },
  };
};

export const ButtonStyles = {
  // style object for base or default style
  baseStyle: {
    color: "white",
    fontWeight: "500",
    _hover: {
      cursor: "pointer",
    },
  },

  // styles for different sizes ("sm", "md", "lg")
  sizes: {},

  variants: {
    ...generateButtonStyles("red", "darkRed", "darkestRed"),
    ...generateButtonStyles("blue", "darkBlue", "darkestBlue"),
    ...generateButtonStyles("grey", "darkGrey", "darkestGrey"),
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "sm",
    variant: "blue",
  },
};
