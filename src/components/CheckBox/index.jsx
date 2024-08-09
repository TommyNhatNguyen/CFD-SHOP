import React, { forwardRef } from "react";

const CheckBox = ({ label, required, children, ...props }, ref) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        ref={ref}
        type="checkbox"
        className="custom-control-input"
        name={props?.name}
        id={props?.name}
        {...props}
      />
      {label && (
        <label
          className="custom-control-label"
          id={props?.name || props?.id}
          name={props?.name}
          htmlFor={props?.name}
        >
          {label}
          {children} {required && "*"}
        </label>
      )}
    </div>
  );
};

export default forwardRef(CheckBox);
