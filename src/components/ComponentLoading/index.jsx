import { Spin } from "antd";
import styled from "styled-components";

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.5);
`;

const ComponentLoading = ({ ...props }) => {
  return (
    <Loading {...props}>
      <Spin />
    </Loading>
  );
};

export default ComponentLoading;
