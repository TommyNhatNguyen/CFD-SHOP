import { Empty } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import Button from "../../../components/Button";
const IntroSection = ({ category, loading }) => {
  return (
    <div className="intro-section pt-3 pb-3 mb-2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="intro-slider-container slider-container-ratio mb-2 mb-lg-0">
              <div
                className="intro-slider owl-carousel owl-simple owl-dark owl-nav-inside"
                data-toggle="owl"
                data-owl-options='{
                                                              "nav": false, 
                                                              "dots": true,
                                                              "responsive": {
                                                                  "768": {
                                                                      "nav": true,
                                                                      "dots": false
                                                                  }
                                                              }
                                                          }'
              >
                <div className="intro-slide">
                  <figure className="slide-image">
                    <img
                      src="/assets/images/demos/demo-3/slider/slide-1.jpg"
                      alt="Image Desc"
                    />
                  </figure>
                  <div className="intro-content">
                    <h3 className="intro-subtitle text-primary">Daily Deals</h3>
                    <h1 className="intro-title">
                      AirPods <br />
                      Earphones
                    </h1>
                    <div className="intro-price">
                      <sup>Today:</sup>
                      <span className="text-primary">
                        $247 <sup>.99</sup>
                      </span>
                    </div>
                    <Button link={PATHS.PRODUCT.DETAIL} variant="round">
                      <span>Click Here</span>
                      <i className="icon-long-arrow-right" />
                    </Button>
                  </div>
                </div>
                <div className="intro-slide">
                  <figure className="slide-image">
                    <img
                      src="assets/images/demos/demo-3/slider/slide-2.jpg"
                      alt="Image Desc"
                    />
                  </figure>
                  <div className="intro-content">
                    <h3 className="intro-subtitle text-primary">
                      Deals and Promotions
                    </h3>
                    <h1 className="intro-title">
                      Echo Dot <br />
                      3rd Gen
                    </h1>
                    <div className="intro-price">
                      <sup className="intro-old-price">$49,99</sup>
                      <span className="text-primary">
                        $29 <sup>.99</sup>
                      </span>
                    </div>
                    <Button link={PATHS.PRODUCT.DETAIL} variant="round">
                      <span>Click Here</span>
                      <i className="icon-long-arrow-right" />
                    </Button>
                  </div>
                </div>
              </div>
              <span className="slider-loader" />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="intro-banners">
              {!loading && category?.length === 0 ? (
                <Empty description="Images not found" />
              ) : (
                category?.map((item, index) => {
                  return (
                    <div
                      key={item?.id || index}
                      className={`banner ${
                        index === category?.length - 1
                          ? "mb-0"
                          : "mb-lg-1 mb-xl-2"
                      }`}
                    >
                      <Link
                        to={PATHS.PRODUCT.INDEX}
                        state={{ category: item?.category || "" }}
                      >
                        <img src={item?.image || ""} alt="Banner" />
                      </Link>
                      <div className="banner-content">
                        <h3
                          className="banner-title"
                          style={{ maxWidth: "180px" }}
                        >
                          <Link
                            to={PATHS.PRODUCT.INDEX}
                            state={{ category: item?.category || "" }}
                          >
                            {item?.name || ""}
                          </Link>
                        </h3>
                        <Link
                          to={PATHS.PRODUCT.INDEX}
                          state={{ category: item?.category || "" }}
                          className="banner-link"
                        >
                          Shop Now <i className="icon-long-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
