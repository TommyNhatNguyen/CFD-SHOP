import React from "react";
import PATHS from "../../../constants/paths";
import { PAYMENT_METHODS } from "../../../constants/general";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/format";

const CheckOutSummary = ({
  renderProductInfo,
  shipping,
  discountCode,
  discount,
  total,
  subTotal,
  _onSelectPaymentMethod,
  isTransfer,
  isCash,
}) => {
  return (
    <aside className="col-lg-3">
      <div className="summary">
        <h3 className="summary-title">Your Order</h3>
        <table className="table table-summary">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {renderProductInfo?.map((product, index) => {
              const productPath = `${PATHS.PRODUCT.INDEX}/${
                product?.slug || ""
              }`;
              return (
                <tr key={product?.id + index}>
                  <td>
                    <Link to={productPath}>{product?.name || ""}</Link>
                    <p>
                      {product?.quantity || 0} x ${product?.price || 0}
                    </p>
                  </td>
                  <td>{formatCurrency(product?.totalProduct || 0)}</td>
                </tr>
              );
            })}
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>{formatCurrency(subTotal || 0)}</td>
            </tr>
            <tr>
              <td>Shipping:</td>
              {shipping ? (
                <td style={{ whiteSpace: "nowrap" }}>
                  {shipping?.typeShip.toUpperCase()} - ${shipping?.price}
                </td>
              ) : (
                <td>
                  <Link to={PATHS.CART}>Select Shipping</Link>
                </td>
              )}
            </tr>
            {discountCode && (
              <tr>
                <td>Discount:</td>
                <td>
                  {discountCode} - ${discount}
                </td>
              </tr>
            )}
            <tr className="summary-total">
              <td>Total:</td>
              <td>{formatCurrency(total || 0)}</td>
            </tr>
          </tbody>
        </table>
        <div className="accordion-summary" id="accordion-payment">
          <div className="card">
            <div
              className="card-header"
              id="heading-1"
              onClick={() => _onSelectPaymentMethod(PAYMENT_METHODS.transfer)}
              style={{
                cursor: "pointer",
              }}
            >
              <h2 className="card-title">
                <a
                  role="button"
                  className={classNames({
                    collapsed: !isTransfer,
                  })}
                >
                  Direct bank transfer
                </a>
              </h2>
            </div>
            <div
              id="collapse-1"
              className={classNames("collapse", {
                show: isTransfer,
              })}
            >
              <div className="card-body">
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </div>
            </div>
          </div>
          <div className="card">
            <div
              className="card-header"
              id="heading-3"
              onClick={() => _onSelectPaymentMethod(PAYMENT_METHODS.cash)}
              style={{
                cursor: "pointer",
              }}
            >
              <h2 className="card-title">
                <a
                  className={classNames({
                    collapsed: !isCash,
                  })}
                  role="button"
                >
                  Cash on delivery
                </a>
              </h2>
            </div>
            <div
              id="collapse-3"
              className={classNames("collapse", {
                show: isCash,
              })}
            >
              <div className="card-body">
                Quisque volutpat mattis eros. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros.
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          <span className="btn-text">Place Order</span>
          <span className="btn-hover-text">Proceed to Checkout</span>
        </button>
      </div>
    </aside>
  );
};

export default CheckOutSummary;
