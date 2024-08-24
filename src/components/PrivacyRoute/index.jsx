import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { tokenMethod } from "../../utils/tokenMethod";
import PATHS from "../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import { handleShowModal } from "../../store/reducer/authReducer";
import { MODAL } from "../../constants/modal";
import { message } from "antd";

const PrivacyRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  useEffect(() => {
    if (!!!tokenMethod.get()) {
      navigate(PATHS.HOME);
      dispatch(handleShowModal(MODAL.login));
      message.warning("Please login to continue");
    }
  }, [profile, pathname]);
  return <Outlet />;
};

export default PrivacyRoute;
