import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import ProductItem from "../../../components/ProductItem";
import Button from "../../../components/Button";

const DealSection = ({ dealsProduct }) => {
  useEffect(() => {
    if ($.fn.countdown) {
      $(".deal-countdown").each(function () {
        var $this = $(this),
          untilDate = $this.data("until"),
          compact = $this.data("compact");

        $this.countdown({
          until: untilDate, // this is relative date +10h +5m vs..
          format: "HMS",
          padZeroes: true,
          labels: [
            "years",
            "months",
            "weeks",
            "days",
            "hours",
            "minutes",
            "seconds",
          ],
          labels1: [
            "year",
            "month",
            "week",
            "day",
            "hour",
            "minutes",
            "second",
          ],
        });
      });

      // Pause
      // $('.deal-countdown').countdown('pause');
    }
  }, []);
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
                backgroundImage:
                  'url("/assets/images/demos/demo-3/deal/bg-1.jpg")',
              }}
            >
              <div className="deal-top">
                <h2>Deal of the Day.</h2>
                <h4>Limited quantities.</h4>
              </div>
              <div className="deal-content">
                <h3 className="product-title">
                  <Link to={PATHS.PRODUCT.INDEX}>
                    Home Smart Speaker with Google Assistant
                  </Link>
                </h3>
                <div className="product-price">
                  <span className="new-price">$129.00</span>
                  <span className="old-price">Was $150.99</span>
                </div>
                <Link to={PATHS.PRODUCT.INDEX} className="btn btn-link">
                  <span>Shop Now</span>
                  <i className="icon-long-arrow-right" />
                </Link>
              </div>
              <div className="deal-bottom">
                <div className="deal-countdown" data-until="+10h" />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="products">
              <div className="row">
                {dealsProduct?.length > 0 &&
                  dealsProduct?.map((item, index) => {
                    return (
                      <div key={item?.id || index} className="col-6">
                        <ProductItem {...item} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="more-container text-center mt-3 mb-0">
          <Button
            link={PATHS.PRODUCT.INDEX}
            variant="outline-dark"
            className="btn-more"
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
