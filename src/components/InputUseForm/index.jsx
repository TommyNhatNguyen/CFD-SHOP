import React, { forwardRef } from "react";

const InputUseForm = (
  { label, required, error, inputGroup, renderInput, className, ...props },
  ref
) => {
  if (inputGroup) {
    return inputGroup?.({ ...props, error, ref });
  }
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label>
          {label} {required && "*"}
        </label>
      )}
      {renderInput ? (
        renderInput?.(props, ref)
      ) : (
        <input
          className={`form-control ${error ? "input-error" : ""}`}
          {...props}
          ref={ref}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default forwardRef(InputUseForm);
