import classNames from "classnames";
import React, { useRef, useState } from "react";
import { SelectWrapper } from "../../../StyledComponents";
import { AutoComplete } from "antd";
import SearchComponent from "../../../SearchComponent";

const Search = ({ options }) => {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const autoCompleteRef = useRef();
  const _onShowSearch = (e) => {
    e?.preventDefault();
    setIsShowSearch((prev) => !prev);
  };
  const onSelect = (data) => {
    autoCompleteRef?.current.blur();
  };
  return (
    <div className="header-search">
      <a
        href="#"
        className={classNames("search-toggle", { active: isShowSearch })}
        role="button"
        title="Search"
        onClick={(e) => _onShowSearch(e)}
      >
        <i className="icon-search" />
      </a>
      <SelectWrapper
        className={`header-search-wrapper ${isShowSearch ? "show" : ""}`}
        style={{ width: "100%" }}
      >
        <div style={{ position: "relative", width: "100%" }}>
          <SearchComponent
            options={options}
            onSelect={onSelect}
            ref={autoCompleteRef}
            popupMatchSelectWidth={270}
            size="large"
            autoFocus={false}
            placeholder="Search in ..."
            notFoundContent="Product not found"
            style={{ width: "100%" }}
          />
        </div>
      </SelectWrapper>
    </div>
  );
};

export default Search;
