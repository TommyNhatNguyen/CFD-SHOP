import React, { useEffect, useState } from "react";
import IntroSection from "./components/IntroSection";
import FeaturedSection from "./components/FeaturedSection";
import DealSection from "./components/DealSection";
import BrandSection from "./components/BrandSection";
import ProductsSection from "./components/ProductsSection";
import PolicySection from "./components/PolicySection";
import SubscribeSection from "./components/SubscribeSection";
import { owlCarousels } from "../../utils/owlCarousels";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import useMutation from "../../hooks/useMutation";
import { productService } from "../../services/productService";

const HomePage = () => {
  const [selectedFeatureTab, setSelectedFeatureTab] = useState("featured");
  /** INTRO SECTION */
  const { data: homeData, loading: homeLoading } = useQuery(() =>
    pageService.getPagesByName("/home")
  );
  const home = homeData?.data || {};
  const { category, brands, information } = home;
  // --- End
  /** FEATURED SECTION */
  const {
    data: featureProductsData,
    loading: featureProductsLoading,
    execute: getFeatureProducts,
  } = useMutation((query) => productService.getProduct(query));
  const query = `?${selectedFeatureTab}=true`;
  useEffect(() => {
    getFeatureProducts(query);
  }, [query]);
  const featureProducts = featureProductsData?.products || [];
  const handleSelectFeatureTab = (tab) => {
    if (!featureProductsLoading) {
      setSelectedFeatureTab(tab);
    }
  };
  // --- End
  useEffect(() => {
    if (featureProducts?.length > 0 && brands?.length > 0) {
      owlCarousels();
    }
  }, [featureProducts, brands]);
  /** DEAL SECTION */
  const { data: dealsProductsData, loading: dealsProductData } = useQuery(() =>
    productService.getProduct("/?onSale=true")
  );
  const dealsProduct = dealsProductsData?.products || [];
  const startIndex = Math.floor(Math.random() * dealsProduct?.length - 2);
  const dealsProductShow = dealsProduct?.slice(startIndex, startIndex + 2);
  // --- End
  /** POLICY SECTION */

  // --- End
  return (
    <main className="main">
      <IntroSection category={category} loading={homeLoading} />
      <FeaturedSection
        selectedFeatureTab={selectedFeatureTab}
        handleSelectFeatureTab={handleSelectFeatureTab}
        featureProducts={featureProducts}
        loading={featureProductsLoading}
      />
      <div className="mb-7 mb-lg-11" />
      <DealSection dealsProduct={dealsProductShow} />
      <BrandSection brands={brands} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <ProductsSection />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <PolicySection {...information} />
      <SubscribeSection />
    </main>
  );
};
export default HomePage;
