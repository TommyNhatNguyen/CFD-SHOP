import { useState } from "react";
import { pageService } from "../../services/pageService";
import { productService } from "../../services/productService";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../constants/message";

function useHomePage() {
  const { data: productsData } = useQuery(productService.getProduct);
  const products = productsData?.products || [];
  const featuredProducts =
    products?.filter((product) => product.featured) || [];
  const onSaleProducts = products?.filter((product) => product.onSale) || [];
  const topRatedProducts =
    products?.filter((product) => product.topRated) || [];
  const dealProducts = onSaleProducts?.filter(
    (product) => product.discount > 0
  );
  const [selectedCategorySlug, setSelectedCategorySlug] = useState("all");
  /** INTRO SECTION */
  const introProducts = featuredProducts.slice(0, 3);
  const introProps = {
    introProducts,
  };
  // ---End
  /** HOT PRODUCT SECTION */
  const hotProductProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
  };
  // ---End
  /** DEALS SECTION */
  const dealsProps = { dealProducts };
  //   ---End
  /** BRAND SECTION */
  const { data: homeData } = useQuery(() =>
    pageService.getPagesByName("/home")
  );
  const brands = homeData?.data?.brands || [];
  const brandProps = { brands };
  // ---End
  /** FEATURE SECTION */
  const { data: categoriesData } = useQuery(
    productService.getProductCategories
  );
  const categories = categoriesData?.products || [];
  const featureProducts =
    selectedCategorySlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCategorySlug
        );
  const featuredProps = {
    categories: [{ name: "All", slug: "all", id: "all" }, ...categories],
    featureProducts,
    selectedCategorySlug,
    handleSelectCategory(slug) {
      setSelectedCategorySlug(slug);
    },
  };
  //  ---End
  /** SERVICE SECTION */
  const services = homeData?.data?.information || [];
  const serviceProps = { services };
  //   ---End
  /** GETDEAL SECTION */
  const { execute: dealExecute } = useMutation(subscribeService.subscribeDeals);
  const handleSubscribeDeal = (email, callback) => {
    if (email) {
      dealExecute(email, {
        onSuccess(data) {
          console.log("first");
          message.success(HOME_MESSAGE.dealSuccess);
          callback?.();
        },
        onFail(error) {
          message.error(GENERAL_MESSAGE.error);
        },
      });
    }
  };
  const getDealProps = { handleSubscribeDeal };
  //   ---End
  return {
    introProps,
    hotProductProps,
    dealsProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
  };
}
export default useHomePage;
