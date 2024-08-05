import React from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import { MODAL } from "../../../../constants/modal";
import { Link } from "react-router-dom";
import PATHS from "../../../../constants/paths";

const HeaderTop = () => {
  const { handleShowModal, profile, handleLogOut } = useAuthContext();
  const _onShowModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleShowModal(e.target.id);
  };
  const _onSignOut = (e) => {
    e.preventDefault();
    handleLogOut();
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
                  {profile?.firstName || ""}
                </a>
                <ul>
                  <li>
                    <ul>
                      <li>
                        <Link to={PATHS.DASHBOARD}>Account Details</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD}>Your Orders</Link>
                      </li>
                      <li>
                        <Link to={PATHS.DASHBOARD}>
                          Wishlist <span>(3)</span>
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
