import { AutoComplete } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SelectWrapper } from "../StyledComponents";
import useDebounce from "../../hooks/useDebounce";
import SearchComponent from "../SearchComponent";

const BlogSearch = ({ options }) => {
  const autoCompleteRef = useRef();
  const onSelect = (data) => {
    autoCompleteRef?.current.blur();
  };
  return (
    <div className="widget widget-search">
      <h3 className="widget-title">Search</h3>
      <SelectWrapper>
        <div style={{ position: "relative" }}>
          <SearchComponent
            options={options}
            ref={autoCompleteRef}
            onSelect={onSelect}
            popupMatchSelectWidth={400}
            size="large"
            autoFocus={false}
            placeholder="Search in blog"
            notFoundContent="Blogs not found"
            className="form-control"
          >
            <button type="submit" className="btn">
              <i className="icon-search" />
            </button>
          </SearchComponent>
        </div>
      </SelectWrapper>
    </div>
  );
};

export default BlogSearch;
