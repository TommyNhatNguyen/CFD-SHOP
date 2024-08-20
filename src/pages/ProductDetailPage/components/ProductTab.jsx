import React from "react";
import { DETAIL_TABS } from "../../../constants/general";
import classNames from "classnames";
import ReviewProductTab from "./ReviewProductTab";
import ContentProductTab from "./ContentProductTab";

const ProductTab = ({
  totalReview,
  reviews,
  shippingReturn,
  description,
  selectedTab,
  handleSelectTab,
  handleReviewProduct,
}) => {
  const _onSelectTab = (e, tab) => {
    e?.preventDefault();
    handleSelectTab(tab);
  };
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        {DETAIL_TABS?.map((tab, index) => {
          return (
            <li key={tab.id || index} className="nav-item">
              <a
                href="#"
                className={classNames("nav-link", {
                  active: tab.id === selectedTab,
                })}
                onClick={(e) => _onSelectTab(e, tab.id)}
              >
                {typeof tab.name === "function"
                  ? tab.name(totalReview)
                  : tab.name}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        {selectedTab === "review" && (
          <ReviewProductTab
            totalReview={totalReview}
            reviews={reviews}
            handleReviewProduct={handleReviewProduct}
          />
        )}
        {selectedTab === "description" && (
          <ContentProductTab>
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </ContentProductTab>
        )}
        {selectedTab === "shippingReturn" && (
          <ContentProductTab>
            <div dangerouslySetInnerHTML={{ __html: shippingReturn }}></div>
          </ContentProductTab>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
