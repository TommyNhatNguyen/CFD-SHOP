import React from "react";

const Input = ({
  label,
  required,
  error,
  inputGroup,
  renderInput,
  className,
  register,
  ...props
}) => {
  if (inputGroup) {
    return inputGroup?.({ ...props, error });
  }
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label>
          {label} {required && "*"}
        </label>
      )}
      {!!renderInput ? (
        renderInput?.({ ...props, error })
      ) : (
        <input
          className={`form-control ${error ? "input-error" : ""} `}
          {...register}
          {...props}
        />
      )}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default Input;
