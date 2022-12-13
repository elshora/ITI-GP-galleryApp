import React from "react";
import { Button } from "react-bootstrap";

function MyButton({
  children,
  variant = "myPrimary",
  size = false,
  rounded = false,
  style,
  className,
  ...extraProps
}) {
  return (
    <Button
      variant={variant}
      style={{
        fontSize: size ? `${size}rem` : "1rem",
        // height: "2em",
        // lineHeight: "1em",
        padding: "0.25em 0.7em",
        borderRadius: rounded ? "0.25rem" : "0.05rem",
        ...style,
      }}
      className
      {...extraProps}
    >
      {children}
    </Button>
  );
}

export default MyButton;

