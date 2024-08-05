import React from "react";

const CheckBox = ({ label, name, required, children, ...props }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={name}
        {...props}
      />
      {label && (
        <label className="custom-control-label" htmlFor={name}>
          {label}
          {children} {required && "*"}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
