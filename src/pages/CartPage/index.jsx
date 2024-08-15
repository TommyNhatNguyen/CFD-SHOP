import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import CartTable from "./components/CartTable";
import CartSummary from "./components/CartSummary";
import useCartPage from "./useCartPage";

const CartPage = () => {
  const { cartTableProps, cartSummaryProps } = useCartPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item link={PATHS.PRODUCT.INDEX}>Product</BreadCrumb.Item>
        <BreadCrumb.Item isActive>Shopping cart</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="cart">
          <div className="container">
            <div className="row">
              <CartTable {...cartTableProps} />
              <CartSummary {...cartSummaryProps} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
