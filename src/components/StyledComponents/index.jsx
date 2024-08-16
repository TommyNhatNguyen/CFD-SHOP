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
      background: transparent !important;
      border: none !important;
    }
  }
`;
