import React from "react";
import { DETAIL_TABS } from "../../../constants/general";
import classNames from "classnames";
import ReviewItem from "../../../components/ReviewItem";

const ProductTab = ({
  totalReview,
  reviews,
  shippingReturn,
  description,
  selectedTab,
  handleSelectTab,
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
        {DETAIL_TABS.map((tab, index) => {
          if (tab.id === "review") {
            return (
              <div
                key={tab.id || index}
                className={classNames("tab-pane fade", {
                  "show active": selectedTab === tab.id,
                })}
                id="product-review-tab"
                role="tabpanel"
                aria-labelledby="product-review-link"
              >
                {totalReview === 0 ? (
                  <h3
                    style={{
                      fontWeight: 400,
                      fontSize: "1.6rem",
                      letterSpacing: "-0.01em",
                      marginBottom: "1.8rem",
                    }}
                  >
                    No reviews
                  </h3>
                ) : (
                  <div className="reviews">
                    {reviews?.map((review, index) => {
                      return (
                        <ReviewItem key={review?.id || index} {...review} />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={tab.id || index}
                className={classNames("tab-pane fade", {
                  "show active": selectedTab === tab.id,
                })}
                id="product-desc-tab"
                role="tabpanel"
                aria-labelledby="product-desc-link"
              >
                <div className="product-desc-content">
                  {tab.id === "description" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                  )}
                  {tab.id === "shippingReturn" && (
                    <div
                      dangerouslySetInnerHTML={{ __html: shippingReturn }}
                    ></div>
                  )}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ProductTab;
