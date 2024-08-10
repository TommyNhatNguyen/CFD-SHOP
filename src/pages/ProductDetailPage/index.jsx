import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import ProductTop from "./components/ProductTop";
import ProductTab from "./components/ProductTab";
import useProductDetailPage from "./useProductDetailPage";

const ProductDetailPage = () => {
  const { productTopProps, productTabProps } = useProductDetailPage();
  const title = productTopProps?.productDetail?.title || "";
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <ol className="breadcrumb">
            <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
            <BreadCrumb.Item link={PATHS.PRODUCT.INDEX}>
              Product
            </BreadCrumb.Item>
            <BreadCrumb.Item isActive>{title}</BreadCrumb.Item>
          </ol>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <ProductTop {...productTopProps} />
          <ProductTab {...productTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
