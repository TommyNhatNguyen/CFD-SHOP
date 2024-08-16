import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import { reviewService } from "../../services/reviewService";
import useQuery from "../../hooks/useQuery";
import styled from "styled-components";
import { Empty } from "antd";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducer/cartReducer";
import { tokenMethod } from "../../utils/tokenMethod";
import {
  handleAddWhiteList,
  handleShowModal,
} from "../../store/reducer/authReducer";
import { MODAL } from "../../constants/modal";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;

const ProductItem = ({
  slug,
  images,
  price,
  rating,
  id,
  name,
  color,
  onSale,
  discount,
  stock,
}) => {
  const isOutOfStock = stock <= 0;
  const [mainImage, hoverImage, ...rest] = images;
  const priceFormated = formatCurrency(price) || 0;
  const isOnSale = (discount || 0) > 0;
  const productPath = `${PATHS.PRODUCT.INDEX}/${slug || ""}`;
  const dispatch = useDispatch();
  const _onAddToCart = (e) => {
    e?.preventDefault();
    const addPayload = {
      addedId: id,
      addedColor: color?.[0] || "",
      addedQuantity: 1,
      addedPrice: price - discount,
    };
    dispatch(handleAddCart(addPayload));
  };
  const _onAddToWishList = (e, id) => {
    e?.preventDefault();
    const addPayload = {
      product: id,
    };
    dispatch(handleAddWhiteList(addPayload));
  };
  return (
    <div className="product product-2">
      <figure className="product-media">
        {isOnSale && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
        <Link to={productPath}>
          {images?.length > 0 ? (
            <>
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
            </>
          ) : (
            <ImageWrapper>
              <Empty description="" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </ImageWrapper>
          )}
        </Link>
        <div className="product-action-vertical">
          <a
            href="#"
            className="btn-product-icon btn-wishlist btn-expandable"
            onClick={(e) => _onAddToWishList(e, id)}
          >
            <span>add to wishlist</span>
          </a>
        </div>
        <div
          className="product-action product-action-dark"
          style={{
            pointerEvents: isOutOfStock ? "none" : "all",
            backgroundColor: isOutOfStock ? "rgba(0,0,0, 0.1)" : "",
          }}
        >
          <a
            href="#"
            className="btn-product btn-cart"
            title="Add to cart"
            onClick={_onAddToCart}
          >
            <span>{isOutOfStock ? "Out of stock" : "add to cart"} </span>
          </a>
        </div>
      </figure>
      <div className="product-body">
        <h3 className="product-title">
          <Link to={productPath}>{name || ""}</Link>
        </h3>
        <div className="product-price">
          {isOnSale ? (
            <>
              <span className="new-price">
                {formatCurrency(price - discount)}
              </span>
              <span className="old-price">Was {formatCurrency(price)}</span>
            </>
          ) : (
            <>{priceFormated}</>
          )}
        </div>
        <div className="ratings-container">
          <div className="ratings">
            <div
              className="ratings-val"
              style={{ width: `${(rating * 100) / 5}%` }}
            />
          </div>
          <span className="ratings-text">( {rating} Reviews )</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
