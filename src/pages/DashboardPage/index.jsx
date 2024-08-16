import React from "react";
import AccountDetailTab from "./components/AccountDetailTab";
import OrderTab from "./components/OrderTab";
import AdressesTab from "./components/AdressesTab";
import WishlistTab from "./components/WishlistTab";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import DashBoardNav from "./components/DashBoardNav";

const DashBoardPage = () => {
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">My Account</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item isActive>My Account</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <DashBoardNav />
              <div className="col-md-8 col-lg-9">
                <div className="tab-content">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashBoardPage;
