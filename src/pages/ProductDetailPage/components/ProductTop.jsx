import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../utils/format";
import styled from "styled-components";
import classNames from "classnames";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";

const ProductNavDotWrapper = styled.div`
  background: ${(props) => props?.$backgroundColor};
`;

const ProductTop = ({ productDetail }) => {
  useEffect(() => {
    function quantityInputs() {
      if ($.fn.inputSpinner) {
        $("input[type='number']").inputSpinner({
          decrementButton: '<i class="icon-minus"></i>',
          incrementButton: '<i class="icon-plus"></i>',
          groupClass: "input-spinner",
          buttonsClass: "btn-spinner",
          buttonsWidth: "26px",
        });
      }
    }
    quantityInputs();

    if ($.fn.elevateZoom) {
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
  }, []);
  const [selectedColor, setSelectedColor] = useState("");
  const { name, rating, price, description, color, category, images } =
    productDetail || {};
  const _onSelectColor = (e, color) => {
    e.preventDefault();
    setSelectedColor(color);
  };
  const _onAddToCart = (e) => {
    e.preventDefault();
  };
  const _onAddToWishList = (e) => {
    e.preventDefault();
  };
  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <div className="product-gallery product-gallery-vertical">
            <div className="row">
              <figure className="product-main-image">
                <img
                  id="product-zoom"
                  src="/assets/images/products/single/1.jpg"
                  data-zoom-image="/assets/images/products/single/1-big.jpg"
                  alt="product image"
                />
                <div id="btn-product-gallery" className="btn-product-gallery">
                  <i className="icon-arrows" />
                </div>
              </figure>
              <div id="product-zoom-gallery" className="product-image-gallery">
                <a
                  className="product-gallery-item active"
                  href="#"
                  data-image="/assets/images/products/single/1.jpg"
                  data-zoom-image="/assets/images/products/single/1-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/1-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/2-big.jpg"
                  data-zoom-image="/assets/images/products/single/2-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/2-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/3-big.jpg"
                  data-zoom-image="/assets/images/products/single/3-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/3-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/4-big.jpg"
                  data-zoom-image="/assets/images/products/single/4-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/4-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
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
                ( {rating} Reviews )
              </a>
            </div>
            <div className="product-price"> {formatCurrency(price || 0)} </div>
            <div
              className="product-content"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <div className="product-nav product-nav-dots">
                {color?.map((item, index) => {
                  return (
                    <ProductNavDotWrapper
                      key={item || index}
                      className={classNames("product-nav-item", {
                        active: selectedColor === item,
                      })}
                      onClick={(e) => _onSelectColor(e, item)}
                      $backgroundColor={item || "#FFFFF"}
                    >
                      <span className="sr-only">Color name</span>
                    </ProductNavDotWrapper>
                  );
                })}
              </div>
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <input
                  type="number"
                  id="qty"
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  max={10}
                  step={1}
                  data-decimals={0}
                  required
                />
              </div>
            </div>
            <div className="product-details-action">
              <a
                onClick={_onAddToCart}
                href="#"
                className="btn-product btn-cart"
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  onClick={_onAddToWishList}
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                {<Link to={PATHS.PRODUCT.INDEX}>{category?.name}</Link>}
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <a
                  href="#"
                  className="social-icon"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTop;
