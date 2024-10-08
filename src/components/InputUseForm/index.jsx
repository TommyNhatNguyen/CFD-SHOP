import React, { forwardRef } from "react";

const InputUseForm = (
  {
    label,
    required,
    error,
    inputGroup,
    renderInput,
    className,
    labelClassName,
    ...props
  },
  ref
) => {
  if (inputGroup) {
    return inputGroup?.({ ...props, error, ref });
  }
  return (
    <div className={`form-group ${className ? className : ""}`}>
      {label && (
        <label className={labelClassName ? labelClassName : ""}>
          {label} {required && "*"}
        </label>
      )}
      {renderInput ? (
        renderInput?.(props, error, ref)
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
