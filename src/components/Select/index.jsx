import React from "react";

const Select = ({ options = [], error, isActive, ...props }) => {
  return (
    <select
      {...props}
      className={`form-control ${!!error ? "input-error" : ""}`}
    >
      {options?.length > 0 &&
        options?.map((option, index) => {
          return (
            <option key={option?.value || index} value={option?.value || ""}>
              {option?.label}
            </option>
          );
        })}
    </select>
  );
};

export default Select;
