import classNames from "classnames";
import moment from "moment";
import React, { useState } from "react";
const TABS = [
  { name: "Description", id: "description" },
  { name: "Shipping & Returns", id: "shipping" },
  { name: (totalReviews) => `Reviews (${totalReviews})`, id: "reviews" },
];
const ProductTab = ({ reviews, description, shippingReturn }) => {
  const totalReviews = reviews?.length;
  const [selectedTab, setSelectedTab] = useState(TABS[0].id);
  const _onSelectedTab = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };
  return (
    <div className="product-details-tab">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        {TABS?.map((item, index) => {
          return (
            <li key={item?.id || index} className="nav-item">
              <a
                className={classNames("nav-link", {
                  active: selectedTab === item?.id,
                })}
                href="#product-desc-tab"
                onClick={(e) => _onSelectedTab(e, item?.id)}
              >
                {typeof item?.name === "function"
                  ? item?.name?.(totalReviews) || ""
                  : item?.name || ""}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content">
        <div
          className={classNames("tab-pane fade", {
            "show active": selectedTab === TABS[0].id,
          })}
          id="product-desc-tab"
        >
          <div
            className="product-desc-content"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          ></div>
        </div>
        <div
          className={classNames("tab-pane fade", {
            "show active": selectedTab === TABS[1].id,
          })}
          id="product-shipping-tab"
        >
          <div
            className="product-desc-content"
            dangerouslySetInnerHTML={{ __html: shippingReturn || "" }}
          ></div>
        </div>
        <div
          className={classNames("tab-pane fade", {
            "show active": selectedTab === TABS[2].id,
          })}
          id="product-review-tab"
        >
          <div className="reviews">
            <h3>Reviews ({totalReviews || 0})</h3>
            {reviews?.map((review, index) => {
              const { name, description, id, rate, title, createdAt } = review;
              const now = moment();

              const reviewDate = moment
                .duration(now.diff(new Date(createdAt)))
                .days();
              return (
                <div key={id || index} className="review">
                  <div className="row no-gutters">
                    <div className="col-auto">
                      <h4>
                        <a href="#">{name || "User"}</a>
                      </h4>
                      <div className="ratings-container">
                        <div className="ratings">
                          <div
                            className="ratings-val"
                            style={{ width: `${(rate * 100) / 5}%` }}
                          />
                        </div>
                      </div>
                      <span className="review-date">
                        {reviewDate || 0} days ago
                      </span>
                    </div>
                    <div className="col">
                      <h4 style={{ height: 20 }}>{title || ""}</h4>
                      <div
                        className="review-content"
                        dangerouslySetInnerHTML={{ __html: description }}
                        style={{ height: 24 }}
                      ></div>
                      <div className="review-action">
                        <a href="#">
                          <i className="icon-thumbs-up" />
                          Helpful (2)
                        </a>
                        <a href="#">
                          <i className="icon-thumbs-down" />
                          Unhelpful (0)
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTab;
