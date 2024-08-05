import { Empty } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import ComponentLoading from "../../../components/ComponentLoading";
import ProductItem from "../../../components/ProductItem";

const featuresTabList = [
  { id: "featured", name: "Featured" },
  { id: "onSale", name: "On Sale" },
  { id: "topRated", name: "Top Rated" },
];

const FeaturedSection = ({
  selectedFeatureTab,
  handleSelectFeatureTab,
  featureProducts,
  loading,
}) => {
  const _onSelectFeatureTab = (e, tab) => {
    e.preventDefault();
    handleSelectFeatureTab(tab);
  };
  return (
    <div className="container featured">
      <ul
        className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
        // role="tablist"
      >
        {featuresTabList.map((item, index) => {
          return (
            <li key={item?.id || index} className="nav-item">
              <a
                href="#"
                className={classNames("nav-link", {
                  active: item?.id === selectedFeatureTab,
                })}
                id={item?.id || ""}
                onClick={(e) => _onSelectFeatureTab(e, item?.id)}
              >
                {item?.name || ""}
              </a>
            </li>
          );
        })}
      </ul>

      <div className="tab-content tab-content-carousel">
        <div
          className="tab-pane p-0 fade show active"
          id="products-featured-tab"
          // role="tabpanel"
          // aria-labelledby="products-featured-link"
          style={{ position: "relative" }}
        >
          {featureProducts?.length > 0 && !loading ? (
            <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true,
                                                      "dots": true,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "600": {
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
              {featureProducts?.map((item, index) => {
                return <ProductItem key={item?.id || index} {...item} />;
              })}
            </div>
          ) : (
            <ComponentLoading />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
