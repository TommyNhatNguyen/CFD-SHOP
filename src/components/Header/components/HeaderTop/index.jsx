import React from "react";

import { MODAL } from "../../../../constants/modal";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import {
  handleLogout,
  handleShowModal,
} from "../../../../store/reducer/authReducer";
import { handleResetCart } from "../../../../store/reducer/cartReducer";

const HeaderTop = () => {
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.auth);
  const { whiteList } = profile || {};
  const totalWhiteList = whiteList?.length || 0;
  const dispatch = useDispatch();
  const _onShowModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleShowModal(MODAL.login));
  };
  const _onSignOut = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
    dispatch(handleResetCart());
    navigate(PATHS.HOME);
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0909284493">
            <i className="icon-phone" /> Hotline: 090 928 4493{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!profile ? (
            <ul className="top-menu top-link-menu">
              <li>
                <a
                  href="#signin-modal"
                  // data-toggle="modal"
                  className="top-menu-login"
                  id={MODAL.login}
                  onClick={_onShowModal}
                >
                  <i className="icon-user" />
                  Login | Resgister{" "}
                </a>
              </li>
            </ul>
          ) : (
            <ul className="top-menu">
              <li>
                <a href="#" className="top-link-menu">
                  <i className="icon-user"></i>
                  {profile?.firstName || "User"}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.DASHBOARD.DETAIL}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.ORDERS}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD.WISHLIST}>
                          Wishlist <span>({totalWhiteList || 0})</span>
                        </Link>
                      </li>
                      <li>
                        <a href="#" onClick={_onSignOut}>
                          Sign Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
