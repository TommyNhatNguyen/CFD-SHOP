import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ className, children }) => {
  return (
    <nav aria-label="breadcrumb" className={`breadcrumb-nav mb-2 ${className}`}>
      <div className="container">
        <ol className="breadcrumb">{children}</ol>
      </div>
    </nav>
  );
};

const BreadCrumbItem = ({ className, isActive = false, children, link }) => {
  return (
    <li className={`breadcrumb-item ${className} ${isActive ? "active" : ""}`}>
      {!!link ? <Link to={link}>{children}</Link> : children}
    </li>
  );
};

BreadCrumb.Item = BreadCrumbItem;

export default BreadCrumb;
