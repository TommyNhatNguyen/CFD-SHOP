import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const QuantitySelect = (
  { min = 1, max = 10, step = 1, onChange, disabled, defaultValue, ...props },
  ref
) => {
  const [quantity, setQuantity] = useState(defaultValue ?? 1);
  const _onIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > max) {
      setQuantity(max);
    } else {
      setQuantity(quantity + step);
    }
  };
  const _onDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity <= min) {
      setQuantity(min);
    } else {
      setQuantity(quantity - step);
    }
  };
  const _onChange = (value) => {
    const quantityInput = Number(value);
    if (value !== "") {
      if (quantityInput > max) {
        setQuantity(Number(max));
      } else if (quantityInput < min) {
        setQuantity(Number(min));
      } else {
        setQuantity(quantityInput);
      }
    } else {
      setQuantity("");
    }
  };
  const _onBlur = () => {
    if (quantity === "") {
      setQuantity(defaultValue);
    }
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        value: quantity,
        reset() {
          setQuantity(defaultValue ?? 1);
        },
      };
    },
    [quantity]
  );
  useEffect(() => {
    onChange?.(quantity);
  }, [quantity]);
  return (
    <div className="product-details-quantity">
      <div className="input-group  input-spinner">
        <div className="input-group-prepend">
          <button
            className="btn btn-decrement btn-spinner"
            type="button"
            onClick={_onDecrease}
            disabled={disabled}
            style={{ pointerEvents: !!disabled ? "none" : "all", minWidth: 26 }}
          >
            <i className="icon-minus" />
          </button>
        </div>
        <InputWrapper
          type="number"
          style={{ textAlign: "center" }}
          className="form-control"
          min={min}
          max={max}
          step={step}
          value={quantity}
          data-decimals={0}
          required
          disabled={disabled}
          onChange={(e) => _onChange(e.target.value)}
          onBlur={_onBlur}
          {...props}
        />
        <div className="input-group-append">
          <button
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={_onIncrease}
            disabled={disabled}
            style={{ pointerEvents: !!disabled ? "none" : "all", minWidth: 26 }}
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantitySelect);
