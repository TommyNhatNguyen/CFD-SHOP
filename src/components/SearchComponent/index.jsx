import React, { forwardRef, useState } from "react";
import { SelectWrapper } from "../StyledComponents";
import { AutoComplete } from "antd";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";

const SearchComponent = (
  { options, filterOption, onSelect, children, ...props },
  ref
) => {
  const [value, setValue] = useState("");
  const onChange = (data) => {
    setValue(data);
  };
  const debouncedValue = useDebounce(value, 300);
  return (
    <>
      <AutoComplete
        ref={ref}
        value={value}
        options={options}
        onChange={onChange}
        onSelect={onSelect}
        {...props}
        filterOption={(inputVal, option) => {
          return option?.value?.[0]
            .toLowerCase()
            .includes(debouncedValue?.toLowerCase());
        }}
      ></AutoComplete>
      {children}
    </>
  );
};

export default forwardRef(SearchComponent);
