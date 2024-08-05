import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import { reviewService } from "../../services/reviewService";
import useQuery from "../../hooks/useQuery";

const ProductItem = ({ slug, images, price, rating, id }) => {
  const [mainImage, hoverImage, ...rest] = images;
  const priceFormated = formatCurrency(price) || 0;
  const { data: reviewData } = useQuery(() =>
    reviewService.getReviewById(`/${id}`)
  );
  const numReviews = reviewData?.length || 0;
  return (
    <div className="product product-2">
      <figure className="product-media">
        <Link to={`${PATHS.PRODUCT.INDEX}/${slug || ""}`}>
          <img
            src={mainImage || ""}
            alt="Product image"
            className="product-image"
          />
          <img
            src={hoverImage || ""}
            alt="Product image"
            className="product-image-hover"
          />
        </Link>
        <div className="product-action-vertical">
          <a href="#" className="btn-product-icon btn-wishlist btn-expandable">
            <span>add to wishlist</span>
          </a>
        </div>
        <div className="product-action product-action-dark">
          <a href="#" className="btn-product btn-cart" title="Add to cart">
            <span>add to cart</span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={`${PATHS.PRODUCT.INDEX}/${slug || ""}`}>
            GoPro - HERO7 Black HD Waterproof Action
          </Link>
        </h3>
        <div className="product-price"> {priceFormated} </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating * 100) / 5}%` }}
            />
          </div>
          <span className="ratings-text">( {numReviews} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
