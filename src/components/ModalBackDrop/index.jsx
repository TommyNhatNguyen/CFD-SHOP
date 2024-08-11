import React from "react";
// import { useAuthContext } from "../../context/AuthContext";
import classNames from "classnames";
import { useSelector } from "react-redux";

const ModalBackDrop = () => {
  // const { modal } = useAuthContext();
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
