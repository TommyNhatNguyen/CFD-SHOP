import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const PagiItemWrapper = styled.li`
  &.page-item-total {
    pointer-events: none;
  }
  margin: 0 10px;
  .page-link {
    &:hover {
      color: #fcb941 !important;
      cursor: pointer;
    }
    display: flex;
    gap: 10px;
  }
`;

const PagiItem = ({
  isDisabled = false,
  isActive = false,
  className = "",
  children,
  onClick,
  ...props
}) => {
  return (
    <PagiItemWrapper
      className={classNames(`page-item ${className}`, {
        disabled: isDisabled,
        active: isActive,
      })}
      onClick={() => (isDisabled ? {} : onClick())}
      {...props}
    >
      <a className="page-link" role="button">
        {children}
      </a>
    </PagiItemWrapper>
  );
};

export default PagiItem;
