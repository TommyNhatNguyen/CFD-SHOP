import React, { useEffect } from "react";
import { MenuStyled } from "../../../StyledComponents";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../../../constants/paths";
import { useMainContext } from "../../../../context/MainContext";
import CartDropdown from "./CartDropdown";
import Search from "./Search";
import useHeaderMiddle from "./useHeaderMiddle";

const HeaderMiddle = () => {
  const { handleShowMobileMenu, isShowMobileMenu, cartDropdownProps } =
    useHeaderMiddle();
  const { handleResetPage } = useMainContext();
  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button
            className={`mobile-menu-toggler ${
              isShowMobileMenu ? "active" : ""
            }`}
            onClick={handleShowMobileMenu}
          >
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuStyled className="menu">
            <li>
              <NavLink end to={PATHS.HOME}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT.INDEX} onClick={handleResetPage}>
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </MenuStyled>
        </nav>
        <div className="header-right">
          <Search />
          <CartDropdown {...cartDropdownProps} />
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
