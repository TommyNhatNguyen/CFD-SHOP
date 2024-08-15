import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import CheckOutDiscount from "./components/CheckOutDiscount";
import CheckOutForm from "./components/CheckOutForm";
import useCheckOut from "./useCheckOut";

const CheckOutPage = () => {
  const { checkoutDiscountProps, checkoutFormProps } = useCheckOut();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Checkout</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item link={PATHS.PRODUCT.INDEX}>Product</BreadCrumb.Item>
        <BreadCrumb.Item isActive>Checkout</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="checkout">
          <div className="container">
            <CheckOutDiscount {...checkoutDiscountProps} />
            <CheckOutForm {...checkoutFormProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOutPage;
