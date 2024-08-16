import React from "react";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { formatCurrency } from "../../../utils/format";
import QuantitySelect from "../../../components/QuantitySelect";
import styled from "styled-components";
import ColorSelect from "../../../components/ColorSelect";
import ComponentLoading from "../../../components/ComponentLoading";
import { Modal } from "antd";

const QuantitySelectWrapper = styled.td`
  .product-details-quantity {
    max-width: 100px;
  }
`;

const ProductTitleWrapper = styled.div`
  .cart-product-color {
    display: flex;
    align-items: center;
    gap: 5px;
    .product-nav-dots {
      margin: initial;
    }
  }
`;

const CartTable = ({
  products,
  handleDeleteProduct,
  handleUpdateQuantity,
  loading,
  quantityRef,
}) => {
  const { confirm } = Modal;
  const _onDeleteProduct = (e, itemId) => {
    e?.preventDefault();
    const removedProduct = products?.[itemId] || {};
    confirm({
      title: "Do you want remove this item from cart?",
      content: (
        <>
          <p>{removedProduct.name || ""}</p>
          <p>
            {removedProduct.quantity || 0} x ${removedProduct.price}
          </p>
        </>
      ),
      onOk() {
        handleDeleteProduct?.(itemId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const _onUpdateQuantity = (value, itemId) => {
    handleUpdateQuantity?.(value, itemId);
  };
  if (!loading && (products?.length === 0 || !!!products)) {
    return (
      <div className="col-lg-9" style={{ position: "relative" }}>
        {(products?.length === 0 || !!!products) && !loading ? (
          <>
            <p>No products in cart</p>
            <Link to={PATHS.PRODUCT.INDEX}>Go to product page</Link>
          </>
        ) : (
          <ComponentLoading />
        )}
      </div>
    );
  }

  return (
    <div className="col-lg-9" style={{ position: "relative" }}>
      {products?.length > 0 && (
        <table className="table table-cart table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              const {
                id,
                images,
                slug,
                name,
                price,
                totalProduct,
                variant,
                quantity,
              } = product || {};
              const productPath = `${PATHS.PRODUCT.INDEX}/${slug}`;
              let imgPath = images?.[0];
              if (imgPath?.split("https")?.length > 2) {
                imgPath = imgPath?.split("https");
                imgPath = "https" + imgPath[2];
              }
              return (
                <tr key={id + index}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <Link to={productPath || ""}>
                          <img src={imgPath || ""} alt="Product image" />
                        </Link>
                      </figure>
                      <ProductTitleWrapper>
                        <h3 className="product-title">
                          <Link to={productPath || ""}>{name || ""}</Link>
                        </h3>
                        <div className="cart-product-color">
                          <p>Color: </p>
                          <ColorSelect colors={[variant]} />
                        </div>
                      </ProductTitleWrapper>
                    </div>
                  </td>
                  <td className="price-col">{formatCurrency(price || 0)}</td>
                  <QuantitySelectWrapper className="quantity-col">
                    <QuantitySelect
                      max={100}
                      defaultValue={quantity}
                      ref={(node) => {
                        quantityRef.current[index] = node;
                      }}
                      onChange={(value) => _onUpdateQuantity(value, index)}
                    />
                  </QuantitySelectWrapper>
                  <td className="total-col">
                    {formatCurrency(totalProduct || 0)}
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={(e) => _onDeleteProduct(e, index)}
                    >
                      <i className="icon-close" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {/* <div className="cart-bottom">
                  <div className="cart-discount">
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control input-error"
                          required
                          placeholder="Coupon code"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary-2"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                      </div>
                      <p className="form-error">Please fill in this field</p>
                    </form>
                  </div>
                  <a href="#" className="btn btn-outline-dark-2">
                    <span>UPDATE CART</span>
                    <i className="icon-refresh" />
                  </a>
                </div> */}
    </div>
  );
};

export default CartTable;
