import React, { useEffect } from "react";
import ProductTop from "./components/ProductTop";
import ProductTab from "./components/ProductTab";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productService";
import { useParams } from "react-router-dom";
import { reviewService } from "../../services/reviewService";
import BreadCrumb from "../../components/BreadCrumb";

const ProductDetailPage = () => {
  const { productSlug } = useParams();
  /** Product Top */
  const {
    data: productDetailData,
    loading: productDetailLoading,
    execute: getProductDetail,
  } = useMutation(productService.getProductBySlug);
  useEffect(() => {
    getProductDetail(`/${productSlug}`);
  }, [productSlug]);
  const productDetail = productDetailData || {};
  // --- End
  /** Product Tab */
  const {
    data: reviewData,
    loading: reviewLoading,
    execute: getReview,
  } = useMutation(reviewService.getReviewById);
  useEffect(() => {
    if (!!productDetail?.id) {
      getReview(`/${productDetail?.id}`);
    }
  }, [productSlug, productDetailData]);
  const reviews = reviewData || [];
  // --- End
  return (
    <main className="main">
      <BreadCrumb />
      <div className="page-content">
        <div className="container">
          <ProductTop productDetail={productDetail} />
          <ProductTab reviews={reviews} {...productDetail} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
