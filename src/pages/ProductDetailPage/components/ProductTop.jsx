import { Empty, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { FullSizeSkeleton } from "../../../components/StyledComponents";
import classNames from "classnames";
import { formatCurrency } from "../../../utils/format";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import ShareLink from "../../../components/ShareLink";
import {
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import ColorSelect from "../../../components/ColorSelect";
import QuantitySelect from "../../../components/QuantitySelect";

const ProductTop = ({
  totalReview,
  productDetail,
  loading,
  handleAddToCart,
  handleAddWishList,
  colorRef,
  quantityRef,
}) => {
  const url = window.location.href;
  const {
    images,
    title,
    rating,
    price,
    description,
    stock,
    color,
    category,
    id,
  } = productDetail || {};
  const isOutOfStock = stock <= 0;
  const [mainImage, ...otherImages] = images || [];
  const formatedPrice = formatCurrency(price || 0);
  const _onAddToCart = (e) => {
    e.preventDefault();
    handleAddToCart();
  };
  const _onAddWishList = (e, id) => {
    e.preventDefault();
    handleAddWishList?.(id);
  };

  if (loading) {
    return (
      <div className="product-details-top" style={{ height: 615 }}>
        <div className="row">
          <div className="col-md-6">
            <FullSizeSkeleton>
              <Skeleton.Image active />
            </FullSizeSkeleton>
          </div>
          <div className="col-md-6">
            <Skeleton.Input active block />
            <br />
            <br />
            <Skeleton.Input active block />
            <br />
            <br />
            <Skeleton.Input active />
            <br />
            <br />
            <Skeleton.Button active />
          </div>
        </div>
      </div>
    );
  }
  useEffect(() => {
    if ($.fn.elevateZoom && images?.length > 0) {
      $("#product-zoom").elevateZoom({
        gallery: "product-zoom-gallery",
        galleryActiveClass: "active",
        zoomType: "inner",
        cursor: "crosshair",
        zoomWindowFadeIn: 400,
        zoomWindowFadeOut: 400,
        responsive: true,
      });

      // On click change thumbs active item
      $(".product-gallery-item").on("click", function (e) {
        $("#product-zoom-gallery").find("a").removeClass("active");
        $(this).addClass("active");

        e.preventDefault();
      });

      var ez = $("#product-zoom").data("elevateZoom");

      // Open popup - product images
      $("#btn-product-gallery").on("click", function (e) {
        if ($.fn.magnificPopup) {
          $.magnificPopup.open(
            {
              items: ez.getGalleryList(),
              type: "image",
              gallery: {
                enabled: true,
              },
              fixedContentPos: false,
              removalDelay: 600,
              closeBtnInside: false,
            },
            0
          );

          e.preventDefault();
        }
      });
    }
    return () => $(".zoomContainer").remove();
  }, [images]);
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <div className="product-gallery product-gallery-vertical">
            <div className="row">
              <figure className="product-main-image">
                {!!images?.length ? (
                  <img
                    id="product-zoom"
                    src={mainImage || ""}
                    data-zoom-image={mainImage || ""}
                    alt="product image"
                  />
                ) : (
                  <Empty />
                )}

                <div id="btn-product-gallery" className="btn-product-gallery">
                  <i className="icon-arrows" />
                </div>
              </figure>
              <div id="product-zoom-gallery" className="product-image-gallery">
                {!!images?.length &&
                  otherImages?.map((img, index) => {
                    return (
                      <a
                        href="#"
                        key={img || index}
                        className={classNames("product-gallery-item", {
                          active: index === 0,
                        })}
                        data-image={img || ""}
                        data-zoom-image={img || ""}
                      >
                        <img src={img || ""} alt="Dark yellow lace" />
                      </a>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{title || ""}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${(rating * 100) / 5}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {totalReview} Reviews )
              </a>
            </div>
            <div className="product-price"> {formatedPrice} </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            ></div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <div className="product-nav product-nav-dots">
                <ColorSelect
                  defaultColor={color?.[0]}
                  colors={color}
                  ref={colorRef}
                />
              </div>
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <QuantitySelect
                max={stock}
                ref={quantityRef}
                disabled={isOutOfStock}
              />
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={(e) => _onAddToCart(e)}
                style={{
                  pointerEvents: isOutOfStock ? "none" : "all",
                  backgroundColor: isOutOfStock ? "rgba(0,0,0, 0.1)" : "",
                }}
              >
                <span>{isOutOfStock ? "Out of stock" : "add to cart"} </span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                  onClick={(e) => _onAddWishList(e, id)}
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <Link to={`${PATHS.PRODUCT.INDEX}?category=${category?.id}`}>
                  {category?.name || ""}
                </Link>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <ShareLink title="Facebook">
                  <FacebookShareButton url={url}>
                    <i className="icon-facebook-f" />
                  </FacebookShareButton>
                </ShareLink>
                <ShareLink title="Twitter">
                  <TwitterShareButton url={url}>
                    <i className="icon-twitter" />
                  </TwitterShareButton>
                </ShareLink>
                <ShareLink title="Instagram">
                  <InstapaperShareButton url={url}>
                    <i className="icon-instagram" />
                  </InstapaperShareButton>
                </ShareLink>
                <ShareLink title="Pinterest">
                  <PinterestShareButton url={url} media={url}>
                    <i className="icon-pinterest" />
                  </PinterestShareButton>
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTop;
