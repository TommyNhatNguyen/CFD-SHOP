import React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

const ModalBackDrop = () => {
  const { showModal } = useSelector((state) => state.auth);
  return (
    <div
      className={classNames("modal-backdrop fade", {
        show: !!showModal,
      })}
      style={{ pointerEvents: "none" }}
    ></div>
  );
};

export default ModalBackDrop;
