import styled from "styled-components";

export const MenuStyled = styled.ul`
  li {
    a.active {
      color: #fcb941 !important;
    }
  }
`;

export const FullSizeSkeleton = styled.div`
  height: 100%;
  .ant-skeleton {
    height: 100%;
    width: 100%;
    .ant-skeleton-image {
      height: 100%;
      width: 100%;
    }
  }
`;

export const SelectWrapper = styled.div`
  .ant-select {
    padding: initial;
    margin: initial;
    .ant-select-selector {
      height: 100%;
      background: transparent !important;
      border: none;
      outline: none;
      .ant-select-selection-search {
        height: 100%;
        outline: none;
        border: none;
        .ant-select-selection-search-input {
          width: initial !important;
          -webkit-appearance: initial !important;
        }
      }
    }
    &.ant-select-focused {
      border-color: #fcb941 !important;
      .ant-select-selector {
        color: #777 !important;
        box-shadow: none !important;
      }
    }
  }
`;

export const PopularPostWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  figure {
    max-width: 100px;
  }
  div {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    max-width: 250px;
    h4 {
      a {
        white-space: normal;
        word-wrap: normal;
      }
    }
  }
`;
