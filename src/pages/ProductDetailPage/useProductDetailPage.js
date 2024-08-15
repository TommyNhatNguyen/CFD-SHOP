import { useEffect, useRef, useState } from "react";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productService";
import { useParams } from "react-router-dom";
import { reviewService } from "../../services/reviewService";
import { DETAIL_TABS } from "../../constants/general";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../../store/reducer/cartReducer";

function useProductDetailPage() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(DETAIL_TABS[0].id);
  const { productSlug } = useParams();
  const {
    data: productDetailData,
    loading: productDetailLoading,
    execute: getProductDetail,
  } = useMutation(productService.getProductBySlug);
  useEffect(() => {
    getProductDetail(`/${productSlug}`);
  }, [productSlug]);
  /** PRODUCT TAB */
  const handleSelectTab = (tab) => {
    setSelectedTab(tab);
  };
  const {
    data: reviewData,
    loading: reviewLoading,
    execute: getReview,
  } = useMutation(reviewService.getReviewById);
  useEffect(() => {
    () => productDetailData?.id && getReview(`/${productDetailData?.id || ""}`);
  }, [productSlug, productDetailData]);
  const productTabProps = {
    loading: reviewLoading,
    totalReview: reviewData?.length || 0,
    reviews: reviewData || [],
    shippingReturn: productDetailData?.shippingReturn,
    description: productDetailData?.description,
    selectedTab,
    handleSelectTab,
  };
  /** PRODUCT TOP */
  const colorRef = useRef();
  const quantityRef = useRef();
  const handleAddToCart = () => {
    const { value: color, reset: colorReset } = colorRef?.current;
    const { value: quantity, reset: quantityReset } = quantityRef?.current;
    if (!!!color) {
      message.warning("Please select a color");
      return;
    } else if (isNaN(quantity) && quantity < 1) {
      message.warning("Quantity must be greater than 1");
    }
    // Call API
    const payload = {
      addedId: productDetailData?.id || "",
      addedColor: color || "",
      addedQuantity: quantity || 0,
      addedPrice: productDetailData?.price - productDetailData?.discount || 0,
    };
    try {
      const res = dispatch(handleAddCart(payload)).unwrap();
      if (res) {
        colorReset();
        quantityReset();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleAddWishList = () => {
    message.success("Item added to wishlist");
  };
  const productTopProps = {
    productDetail: productDetailData || {},
    loading: productDetailLoading,
    totalReview: reviewData?.length || 0,
    handleAddWishList,
    handleAddToCart,
    colorRef,
    quantityRef,
  };
  //   --- End
  return { productTopProps, productTabProps };
}
export default useProductDetailPage;
