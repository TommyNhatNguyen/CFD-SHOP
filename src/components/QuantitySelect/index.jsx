import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const QuantitySelect = ({ min = 1, max = 10, step = 1 }, ref) => {
  const [quantity, setQuantity] = useState(1);
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
  const _onChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const quantityInput = Number(e.target.value);
    if (quantityInput > max) {
      setQuantity(Number(max));
    } else if (quantityInput < min) {
      setQuantity(Number(min));
    } else {
      setQuantity(quantityInput);
    }
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        value: quantity,
        reset() {
          setQuantity(1);
        },
      };
    },
    [quantity]
  );
  return (
    <div className="product-details-quantity">
      <div className="input-group  input-spinner">
        <div className="input-group-prepend">
          <button
            style={{ minWidth: 26 }}
            className="btn btn-decrement btn-spinner"
            type="button"
            onClick={_onDecrease}
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
          onChange={_onChange}
        />
        <div className="input-group-append">
          <button
            style={{ minWidth: 26 }}
            className="btn btn-increment btn-spinner"
            type="button"
            onClick={_onIncrease}
          >
            <i className="icon-plus" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(QuantitySelect);
