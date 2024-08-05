import React, { useState } from "react";
import { MenuStyled } from "../StyledComponents";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../constants/paths";
import { useMainContext } from "../../context/MainContext";
import { MENU_TABS } from "../../constants/general";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";

const MobileMenuContainer = () => {
  const [selectedMenuTab, setSelectedMenuTab] = useState(MENU_TABS.menu);
  const { handleCloseMobileMenu } = useMainContext();
  const _onActiveMenuTab = (e) => {
    e.preventDefault();
    setSelectedMenuTab(e.target.id);
  };
  // Product categories
  const { data: productCategoriesData } = useQuery(
    productService.getProductCategories
  );
  const categories = productCategoriesData?.products || [];
  return (
    <div className="mobile-menu-container">
      <div className="mobile-menu-wrapper">
        <span className="mobile-menu-close" onClick={handleCloseMobileMenu}>
          <i className="icon-close" />
        </span>
        <form action="#" method="get" className="mobile-search">
          <label htmlFor="mobile-search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            className="form-control"
            name="mobile-search"
            id="mobile-search"
            placeholder="Search in..."
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="icon-search" />
          </button>
        </form>
        <ul className="nav nav-pills-mobile nav-border-anim" role="tablist">
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedMenuTab === MENU_TABS.menu ? "active" : ""
              }`}
              id="mobile-menu-link"
              // data-toggle="tab"
              href="#mobile-menu-tab"
              // role="tab"
              // aria-controls="mobile-menu-tab"
              // aria-selected="true"
              onClick={_onActiveMenuTab}
            >
              Menu
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                selectedMenuTab === MENU_TABS.categories ? "active" : ""
              }`}
              id="mobile-cats-link"
              // data-toggle="tab"
              href="#mobile-cats-tab"
              // role="tab"
              // aria-controls="mobile-cats-tab"
              // aria-selected="false"
              onClick={_onActiveMenuTab}
            >
              Categories
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div
            className={`tab-pane fade ${
              selectedMenuTab === MENU_TABS.menu ? "active show" : ""
            }`}
            id="mobile-menu-tab"
            // role="tabpanel"
            // aria-labelledby="mobile-menu-link"
          >
            <nav className="mobile-nav">
              <MenuStyled className="mobile-menu">
                <li>
                  <NavLink end to={PATHS.HOME}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.PRODUCT.INDEX}>Product</NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
                </li>
                <li>
                  <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                </li>
              </MenuStyled>
            </nav>
            {/* End .mobile-nav */}
          </div>
          {/* .End .tab-pane */}
          <div
            className={`tab-pane fade ${
              selectedMenuTab === MENU_TABS.categories ? "active show" : ""
            }`}
            id="mobile-cats-tab"
            // role="tabpanel"
            // aria-labelledby="mobile-cats-link"
          >
            <nav className="mobile-cats-nav">
              <ul className="mobile-cats-menu">
                {categories?.map((item, index) => {
                  return (
                    <li key={item?.id || index}>
                      <Link
                        className={`${
                          item?.name === "TV" ? "mobile-cats-lead" : ""
                        }`}
                        to={PATHS.PRODUCT.INDEX}
                      >
                        {item?.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* End .mobile-cats-menu */}
            </nav>
            {/* End .mobile-cats-nav */}
          </div>
          {/* .End .tab-pane */}
        </div>
        {/* End .tab-content */}
        <div className="social-icons">
          <a href="#" className="social-icon" target="_blank" title="Facebook">
            <i className="icon-facebook-f" />
          </a>
          <a href="#" className="social-icon" target="_blank" title="Twitter">
            <i className="icon-twitter" />
          </a>
          <a href="#" className="social-icon" target="_blank" title="Instagram">
            <i className="icon-instagram" />
          </a>
          <a href="#" className="social-icon" target="_blank" title="Youtube">
            <i className="icon-youtube" />
          </a>
        </div>
        {/* End .social-icons */}
      </div>
      {/* End .mobile-menu-wrapper */}
    </div>
  );
};

export default MobileMenuContainer;
