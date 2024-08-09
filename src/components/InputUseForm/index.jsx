import React, { forwardRef } from "react";

const InputUseForm = (
  { label, required, error, inputGroup, ...props },
  ref
) => {
  if (inputGroup) {
    return inputGroup?.({ ...props, error, ref });
  }
  return (
    <div className="form-group">
      {label && (
        <label>
          {label} {required && "*"}
        </label>
      )}
      <input
        className={`form-control ${error ? "input-error" : ""}`}
        {...props}
        ref={ref}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default forwardRef(InputUseForm);
