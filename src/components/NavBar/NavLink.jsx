import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

/**
 * Component for routing to different pages
 * @param href - The link you are trying to route to
 * @param children - Either any element like <div> or a string, which will be wrapped with an <a> tag
 */
const NavLink = ({ href, name, ...rest }) => {
  return href ? (
    <Link href={href}>
      <NavButton name={name} href={true} {...rest} />
    </Link>
  ) : (
    <NavButton name={name} {...rest} />
  );
};

const NavButton = ({ name, href, children, ...rest }) => (
  <Button
    as={href ? "a" : "button"}
    color="grey"
    _hover={{
      color: "blue",
      transform: "scale(1.01)",
      textDecoration: "underline",
      textDecorationThickness: "0.20em",
      textUnderlineOffset: "0.30em",
    }}
    cursor="pointer"
    size="md"
    variant="link"
    mx={8}
    mt={1}
    {...rest}
  >
    {name || children}
  </Button>
);

export default NavLink;
