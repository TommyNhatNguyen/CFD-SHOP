import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../store/reducer/authReducer";
import { handleResetCart } from "../../../store/reducer/cartReducer";

const DashBoardNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _onSignOut = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
    dispatch(handleResetCart());
    navigate(PATHS.HOME);
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink
            end
            to={PATHS.DASHBOARD.DETAIL}
            className="nav-link"
            href="#tab-account"
          >
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            href="#tab-orders"
            to={PATHS.DASHBOARD.ORDERS}
          >
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            href="#tab-address"
            to={PATHS.DASHBOARD.ADRESSES}
          >
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            href="#tab-wishlist"
            to={PATHS.DASHBOARD.WISHLIST}
          >
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            href="#tab-wishlist"
            to={PATHS.DASHBOARD.CHANGEPASSWORD}
          >
            Change Password
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={_onSignOut}>
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default DashBoardNav;
