import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  link,
  variant = "primary",
  className,
  children,
  ...props
}) => {
  let variantClass;
  switch (variant) {
    case "primary":
      variantClass = "btn btn-outline-primary-2";
      break;
    case "primmary2":
      variantClass = "btn btn-primary";
      break;
    case "round":
      variantClass = "btn btn-primary btn-round";
      break;
    case "outline-dark":
      variantClass = "btn btn-outline-dark-2 btn-round";
      break;
    case "outline-primary":
      variantClass = "btn btn-outline-primary-2";
      break;
    default:
      variantClass = "btn btn-outline-primary-2";
      break;
  }
  if (link) {
    return (
      <Link to={link} className={`${variantClass} ${className}`} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
