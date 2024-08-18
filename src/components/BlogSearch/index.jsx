import { AutoComplete } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectWrapper } from "../StyledComponents";

const BlogSearch = ({ options }) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const autoCompleteRef = useRef();
  const onChange = (data) => {
    setValue(data);
  };

  const onSelect = (data) => {
    const blogPath = data?.[1];
    navigate(blogPath);
    autoCompleteRef?.current.blur();
  };

  return (
    <div className="widget widget-search">
      <h3 className="widget-title">Search</h3>
      <SelectWrapper>
        <AutoComplete
          ref={autoCompleteRef}
          value={value}
          popupMatchSelectWidth={400}
          style={{
            width: 250,
          }}
          options={options}
          size="large"
          onChange={onChange}
          onSelect={onSelect}
          autoFocus={false}
          placeholder="Search in blog"
          notFoundContent="Blogs not found"
          filterOption={(inputVal, option) => {
            return option?.value?.[0]
              .toLowerCase()
              .includes(inputVal.toLowerCase());
          }}
          className="form-control"
        >
          <button type="submit" className="btn">
            <i className="icon-search" />
          </button>
        </AutoComplete>
      </SelectWrapper>
    </div>
  );
};

export default BlogSearch;
