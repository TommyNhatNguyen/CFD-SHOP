import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";
import classNames from "classnames";

const BreadCrumbs = ({}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnames = pathname.split("/").filter((item) => item);
  const _onNavigate = (path) => {
    navigate(`/${path}`);
  };
  return (
    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={PATHS.HOME}>Home</Link>
          </li>
          {pathnames?.length > 0 &&
            pathnames?.map((item, index) => {
              return (
                <li
                  key={item || index}
                  className={classNames("breadcrumb-item", {
                    active: index === pathnames?.length - 1,
                  })}
                  aria-current="page"
                  onClick={() => _onNavigate(item)}
                >
                  {item?.replace("-", " ") || ""}
                </li>
              );
            })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadCrumbs;
