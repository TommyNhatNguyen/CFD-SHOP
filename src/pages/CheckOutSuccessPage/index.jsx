import React from "react";
import { Link, useParams } from "react-router-dom";
import PATHS from "../../constants/paths";
import Button from "../../components/Button";

const CheckOutSuccessPage = () => {
  const { orderSlug } = useParams();
  console.log(orderSlug);
  return (
    <main className="main">
      <div className="content-success text-center">
        <div className="container">
          <h1 className="content-title">Your Order is Completed!</h1>
          <p>
            Your order <strong>{orderSlug}</strong> has been completed. Your
            order details are shown for your personal accont.
          </p>
          <Button link={PATHS.DASHBOARD} className="btn-minwidth-lg">
            <span>VIEW MY ORDERS</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CheckOutSuccessPage;
