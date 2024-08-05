import React from "react";

const Input = ({ label, required, error, inputGroup, onClick, ...props }) => {
  if (inputGroup) {
    return inputGroup?.({ ...props, error });
  } else {
    return (
      <div className="form-group">
        {label && (
          <label htmlFor="singin-email">
            {label} {required && "*"}
          </label>
        )}
        <input
          className={`form-control ${error ? "input-error" : ""}`}
          required={!!required}
          {...props}
        />
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  }
};

export default Input;
