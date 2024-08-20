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
          z-index: 0s;
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
  .form-error {
    margin-top: 1.3rem;
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

export const ProductTitleWrapper = styled.div`
  .cart-product-color {
    display: flex;
    align-items: center;
    gap: 5px;
    .product-nav-dots {
      margin: initial;
    }
  }
`;

export const ReplyFormWrapper = styled.div`
  position: relative;
  .reply__login {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.8;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
