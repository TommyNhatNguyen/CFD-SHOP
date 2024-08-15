import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { tokenMethod } from "../../utils/tokenMethod";
import PATHS from "../../constants/paths";
import { useDispatch } from "react-redux";
import { handleShowModal } from "../../store/reducer/authReducer";
import { MODAL } from "../../constants/modal";

const PrivacyRoute = () => {
  const dispatch = useDispatch();
  if (!!!tokenMethod.get()) {
    dispatch(handleShowModal(MODAL.login));
    return <Navigate to={PATHS.HOME} />;
  }
  return <Outlet />;
};

export default PrivacyRoute;
