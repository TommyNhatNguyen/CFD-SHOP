import BrandSection from "./components/BrandSection";
import DealSection from "./components/DealSection";
import FeaturedSection from "./components/FeaturedSection";
import GetDealSection from "./components/GetDealSection";
import HotProductSection from "./components/HotProductSection";
import IntroSection from "./components/IntroSection";
import ServiceSection from "./components/ServiceSection";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const {
    introProps,
    hotProductProps,
    dealsProps,
    brandProps,
    featuredProps,
    serviceProps,
    getDealProps,
  } = useHomePage();

  return (
    <main className="main">
      <IntroSection {...introProps} />
      <HotProductSection {...hotProductProps} />
      <div className="mb-7 mb-lg-11" />
      <DealSection {...dealsProps} />
      <BrandSection {...brandProps} />
      <div className="container">
        <hr className="mt-3 mb-6" />
      </div>
      <div className="container">
        <hr className="mt-5 mb-6" />
      </div>
      <FeaturedSection {...featuredProps} />
      <div className="container">
        <hr className="mt-5 mb-0" />
      </div>
      <ServiceSection {...serviceProps} />
      <GetDealSection {...getDealProps} />
    </main>
  );
};
export default HomePage;
