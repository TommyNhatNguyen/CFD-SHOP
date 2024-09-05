import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../../../constants/paths";
import { formatCurrency } from "../../../../utils/format";
import Button from "../../../Button";
import ColorSelect from "../../../ColorSelect";
import styled from "styled-components";

const DropdownContainer = styled.div`
  max-height: 30vh;
  overflow-y: scroll;
  scrollbar-width: thin;
  .cart-product-color {
    display: flex;
    align-items: center;
    gap: 5px;
    .product-nav-dots {
      margin: initial;
    }
  }
`;

const CartDropdown = ({
  products,
  total,
  itemsInCart,
  handleRemoveProduct,
}) => {
  const _onRemoveItem = (e, itemId) => {
    e?.preventDefault();
    handleRemoveProduct?.(itemId);
  };
  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <i className="icon-shopping-cart" />
        <span className="cart-count">{itemsInCart}</span>
      </a>
      <div className="dropdown-menu dropdown-menu-right">
        <DropdownContainer className="dropdown-cart-products">
          {products?.length === 0 || products?.length === undefined ? (
            <>
              <p>No products in cart</p>
              <Link to={PATHS.PRODUCT.INDEX}>Go to product page</Link>
            </>
          ) : (
            products?.map((product, index) => {
              const { id, slug, name, price, images, quantity, variant } =
                product || {};
              const productPath = `${PATHS.PRODUCT.INDEX}/${slug || ""}`;
              let imgPath = images?.[0];
              if (imgPath?.split("https")?.length > 2) {
                imgPath = imgPath?.split("https");
                imgPath = "https" + imgPath?.slice(-1);
              }
              return (
                <div key={id + index} className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <Link to={productPath}>{name || ""}</Link>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">{quantity || 0}</span>{" "}
                      x {formatCurrency(price || 0)}
                    </span>
                    <div className="cart-product-color">
                      <p>Color: </p>
                      <ColorSelect colors={[variant]} />
                    </div>
                  </div>
                  <figure className="product-image-container">
                    <Link to={productPath} className="product-image">
                      <img src={imgPath} alt="product" />
                    </Link>
                  </figure>
                  <a
                    href="#"
                    className="btn-remove"
                    title="Remove Product"
                    onClick={(e) => _onRemoveItem(e, index)}
                  >
                    <i className="icon-close" />
                  </a>
                </div>
              );
            })
          )}
        </DropdownContainer>
        {products?.length > 0 && (
          <>
            <div className="dropdown-cart-total">
              <span>Total</span>
              <span className="cart-total-price">
                {formatCurrency(total || 0)}
              </span>
            </div>
            <div className="dropdown-cart-action">
              <Button
                link={PATHS.CART}
                variant="primmary2"
                style={{ width: "100%" }}
              >
                View Cart
              </Button>
              {/* <Button link={PATHS.CHECKOUT} variant="outline-primary">
                <span>Checkout</span>
                <i className="icon-long-arrow-right" />
              </Button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
