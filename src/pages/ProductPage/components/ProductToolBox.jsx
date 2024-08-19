import React from "react";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import { SORT_OPTIONS } from "../../../constants/general";
import styled from "styled-components";

const ToolboxRightWrapper = styled.div`
  .form-group {
    display: flex;
    align-items: center;
    gap: 5px;
    label {
      white-space: nowrap;
    }
  }
`;

const ProductToolBox = ({ showNum, totalNum, onSortChange, activeSort }) => {
  const onSelectChange = (e) => {
    onSortChange?.(e.target.value);
  };
  return (
    <div className="toolbox">
      <div className="toolbox-left">
        <div className="toolbox-info">
          Showing &nbsp;
          <span>
            {showNum || 0} of {totalNum || 0}
          </span>
          &nbsp; Products
        </div>
      </div>
      <ToolboxRightWrapper className="toolbox-right">
        <Input
          className="toolbox-sort"
          label="Sort by:"
          renderInput={(inputProps) => {
            return (
              <Select
                options={[
                  SORT_OPTIONS.popularity,
                  SORT_OPTIONS.pricelow,
                  SORT_OPTIONS.pricehigh,
                  SORT_OPTIONS.newest,
                  SORT_OPTIONS.rating,
                ]}
                {...inputProps}
                value={activeSort}
                onChange={onSelectChange}
              />
            );
          }}
        />
      </ToolboxRightWrapper>
    </div>
  );
};

export default ProductToolBox;
