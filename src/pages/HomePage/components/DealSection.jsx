import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { formatCurrency } from "../../../utils/format";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";
import moment from "moment";
import CountDown from "../../../components/CountDown";

const DealSection = ({ dealProducts }) => {
  const dealOfTheDayProduct = dealProducts?.[0] || {};
  const targetTime = moment()
    .add(1, "day")
    .set({ hour: 17, minute: 0, second: 0, millisecond: 0 });
  return (
    <div className="bg-light deal-container pt-7 pb-7 mb-5">
      <div className="container">
        <div className="heading text-center mb-4">
          <h2 className="title">Deals &amp; Outlet</h2>
          <p className="title-desc">Today’s deal and more</p>
        </div>
        <div className="row">
          <div className="col-lg-6 deal-col">
            <div
              className="deal"
              style={{
                backgroundImage: `url(${
                  dealOfTheDayProduct?.images?.[0] || ""
                })`,
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities. </h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <Link
                    to={`${PATHS.PRODUCT.INDEX}/${
                      dealOfTheDayProduct?.slug || ""
                    }`}
                  >
                    {dealOfTheDayProduct?.name || ""}
                  </Link>
                </h3>
                <div className="product-price">
                  <span className="new-price">
                    {formatCurrency(
                      dealOfTheDayProduct?.price -
                        dealOfTheDayProduct?.discount || 0
                    )}
                  </span>
                  <span className="old-price">
                    Was {formatCurrency(dealOfTheDayProduct?.price || 0)}
                  </span>
                </div>
                <Link
                  to={`${PATHS.PRODUCT.INDEX}/${
                    dealOfTheDayProduct?.slug || ""
                  }`}
                  className="btn btn-link"
                >
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
              <div className="deal-bottom">
                {targetTime && <CountDown targetTime={targetTime} />}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                {dealProducts?.slice(1, 3)?.map((product, index) => {
                  return (
                    <div key={product?.id || index} className="col-6">
                      <ProductItem {...product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Button
            variant="outline-dark"
            className="btn-more"
            link={PATHS.PRODUCT.INDEX}
          >
            <span>Shop more</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DealSection;
