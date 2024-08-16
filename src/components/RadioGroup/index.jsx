import React, { createContext, useContext, useEffect, useState } from "react";

const RadioContext = createContext({});

const RadioGroup = ({ defaultValue, children, onChange }) => {
  const [selectedRadio, setSelectedRadio] = useState(defaultValue || "");
  useEffect(() => {
    setSelectedRadio(defaultValue);
  }, [defaultValue]);
  const _onSelectRadio = (e) => {
    setSelectedRadio(e.target.value);
    onChange?.(e.target.value);
  };
  return (
    <RadioContext.Provider value={{ _onSelectRadio, selectedRadio }}>
      {children}
    </RadioContext.Provider>
  );
};

const RadioGroupItem = ({ value, label }) => {
  const { _onSelectRadio, selectedRadio } = useContext(RadioContext);
  return (
    <div className="custom-control custom-radio">
      <input
        className="custom-control-input"
        type="radio"
        id={value}
        name="shipping"
        value={value}
        checked={value === selectedRadio}
        onChange={_onSelectRadio}
      />
      <label className="custom-control-label" htmlFor={value}>
        {label}
      </label>
    </div>
  );
};

RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
