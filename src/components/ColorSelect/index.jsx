import classNames from "classnames";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const ColorSelect = ({ colors, defaultColor = "" }, ref) => {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const _onSelectColor = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
  };
  useImperativeHandle(
    ref,
    () => {
      return {
        value: selectedColor,
        reset() {
          setSelectedColor(defaultColor);
        },
      };
    },
    [selectedColor]
  );
  return (
    <div className="product-nav product-nav-dots">
      {colors?.map((item, index) => {
        return (
          <div
            key={item || index}
            className={classNames("product-nav-item", {
              active: selectedColor === item,
            })}
            style={{ background: item || "" }}
            onClick={(e) => _onSelectColor(e, item)}
          >
            <span className="sr-only">Color name</span>
          </div>
        );
      })}
    </div>
  );
};

export default forwardRef(ColorSelect);
