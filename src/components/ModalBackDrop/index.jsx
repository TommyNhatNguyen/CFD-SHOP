import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import classNames from "classnames";

const ModalBackDrop = () => {
  const { modal } = useAuthContext();
  return (
    <div
      className={classNames("modal-backdrop fade", {
        show: !!modal,
      })}
      style={{ pointerEvents: "none" }}
    ></div>
  );
};

export default ModalBackDrop;
