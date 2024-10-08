import React, { useEffect } from "react";
import { owlCarousels } from "../../../utils/owlCarousels";
import classNames from "classnames";
import ProductItem from "../../../components/ProductItem";

const FeaturedSection = ({
  categories,
  featureProducts,
  selectedCategorySlug,
  handleSelectCategory,
}) => {
  const _onSelectCategoryTab = (e, category) => {
    e.preventDefault();
    e.stopPropagation;
    handleSelectCategory("");
    setTimeout(() => {
      handleSelectCategory(category);
    }, 200);
  };
  useEffect(() => {
    owlCarousels();
  }, [selectedCategorySlug, categories, featureProducts]);
  return (
    <div className="container top" style={{ height: 565 }}>
      <div className="heading heading-flex mb-3">
        <div className="heading-left">
          <h2 className="title">Featured Products</h2>
        </div>
        <div className="heading-right">
          <ul
            className="nav nav-pills nav-border-anim justify-content-center"
            role="tablist"
          >
            {categories?.length > 0 &&
              categories?.map((item, index) => {
                return (
                  <li key={item?.id || index} className="nav-item">
                    <a
                      href="#"
                      className={classNames("nav-link", {
                        active: item?.slug === selectedCategorySlug,
                      })}
                      onClick={(e) => _onSelectCategoryTab(e, item?.slug)}
                    >
                      {item?.name || ""}
                    </a>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      <div className="tab-content tab-content-carousel just-action-icons-sm">
        <div
          className={classNames("tab-pane p-0 fade", {
            "show active": featureProducts?.length > 0,
          })}
          id="top-all-tab"
          role="tabpanel"
          aria-labelledby="top-all-link"
        >
          {featureProducts?.length > 0 && (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": false,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "480": {
                                                              "items":2
                                                          },
                                                          "992": {
                                                              "items":3
                                                          },
                                                          "1200": {
                                                              "items":4
                                                          }
                                                      }
                                                  }'
            >
              {featureProducts?.map((product, index) => {
                return <ProductItem key={product?.id || index} {...product} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
