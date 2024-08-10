import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Pagination from "../../components/Pagination";
import ProductToolBox from "./components/ProductToolBox";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import PATHS from "../../constants/paths";
import useProductPage from "./useProductPage";

const ProductPage = () => {
  const { productListProps, pagiProps, toolboxProps, filterProps } =
    useProductPage();

  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item isActive>Product</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <ProductToolBox {...toolboxProps} />
              <ProductList {...productListProps} />
              <Pagination {...pagiProps} />
            </div>
            <ProductFilter {...filterProps} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
