import React from "react";
import Button from "../../../components/Button";
import PATHS from "../../../constants/paths";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../utils/format";
import { SHIPPING_OPTIONS } from "../../../constants/general";
import RadioGroup from "../../../components/RadioGroup";
import { message } from "antd";

const CartSummary = ({ total, subTotal, handleUpdateShipping, shipping }) => {
  const navigate = useNavigate();
  const _onSelectShipping = (typeShip) => {
    handleUpdateShipping(typeShip);
  };
  const _onCheckout = (e) => {
    if (!!shipping && !!shipping?.typeShip && subTotal > 0 && total > 0) {
      message.success("Checkout Success");
      navigate(`${PATHS.CHECKOUT.INDEX}`);
    } else if (!!!shipping?.typeShip) {
      message.warning("Please select a shipping method");
    } else {
      message.error("Checkout Failed");
    }
  };
  return (
    <aside className="col-lg-3">
      <div className="summary summary-cart">
        <h3 className="summary-title">Cart Total</h3>
        <table className="table table-summary">
          <tbody>
            <tr className="summary-subtotal">
              <td>Subtotal:</td>
              <td>{formatCurrency(subTotal || 0)}</td>
            </tr>
            <tr className="summary-shipping">
              <td>Shipping:</td>
              <td>&nbsp;</td>
            </tr>
            {
              <RadioGroup
                onChange={_onSelectShipping}
                defaultValue={shipping?.typeShip}
              >
                {SHIPPING_OPTIONS.map((item, index) => {
                  return (
                    <tr
                      key={item.value || index}
                      className="summary-shipping-row"
                    >
                      <td>
                        <RadioGroup.Item
                          label={item.label}
                          value={item.value}
                        />
                      </td>
                      <td>{formatCurrency(item.price) || 0}</td>
                    </tr>
                  );
                })}
              </RadioGroup>
            }

            <tr className="summary-shipping-estimate">
              <td>
                Estimate for Your Country <br />
                <Link to={PATHS.DASHBOARD}>Change address</Link>
              </td>
              <td>&nbsp;</td>
            </tr>
            <tr className="summary-total">
              <td>Total:</td>
              <td>{formatCurrency(total || 0)}</td>
            </tr>
          </tbody>
        </table>
        <a
          onClick={(e) => _onCheckout(e)}
          className="btn btn-outline-primary-2 btn-order btn-block"
        >
          PROCEED TO CHECKOUT
        </a>
      </div>
      <Button
        link={PATHS.PRODUCT.INDEX}
        className="btn btn-outline-dark-2 btn-block mb-3"
      >
        <span>CONTINUE SHOPPING</span>
        <i className="icon-refresh" />
      </Button>
    </aside>
  );
};

export default CartSummary;
