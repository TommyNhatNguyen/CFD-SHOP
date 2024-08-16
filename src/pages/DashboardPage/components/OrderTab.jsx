import React, { Fragment } from "react";
import useQuery from "../../../hooks/useQuery";
import { orderService } from "../../../services/orderService";
import PATHS from "../../../constants/paths";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/format";
import styled from "styled-components";
import Button from "../../../components/Button";

const RowWrapper = styled.tr`
  td {
    border-bottom: none;
  }
  &#total {
    td {
      border-bottom: 0.2rem solid #ebebeb;
    }
  }
`;

const OrderTab = () => {
  const { data: ordersData } = useQuery(orderService.getOrders);
  const orders = ordersData?.orders || [];
  const productsByOrder = orders?.map((order, index) => {
    return [
      ...order?.product?.map((product, productIndex) => {
        return {
          ...product,
          quantity: order?.quantity?.[productIndex],
          totalProduct: order?.totalProduct?.[productIndex],
          variant: order?.variant?.[productIndex],
          orderId: order?.id,
        };
      }),
    ];
  });
  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
    >
      {orders ? (
        <table className="table table-cart table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsByOrder?.map((item, orderIndex) => {
              return (
                <Fragment key={`${item?.id}${orderIndex}`}>
                  {item?.map((product, index) => {
                    const {
                      id,
                      slug,
                      images,
                      quantity,
                      variant,
                      totalProduct,
                      name,
                      price,
                      orderId,
                    } = product || {};
                    const productPath = `${PATHS.PRODUCT.INDEX}/${slug}`;
                    let imgPath = images?.[0];

                    if (imgPath?.split("https")?.length > 2) {
                      imgPath = imgPath?.split("https");
                      imgPath = "https" + imgPath?.slice(-1);
                    }
                    return (
                      <RowWrapper key={`${id}${index}${orderId}`}>
                        <td className="product-col">
                          <div className="product">
                            <figure className="product-media">
                              <Link to={productPath}>
                                <img src={imgPath || ""} alt="Product image" />
                              </Link>
                            </figure>
                            <h3 className="product-title">
                              <Link to={productPath}>{name || ""}</Link>
                            </h3>
                          </div>
                        </td>
                        <td className="price-col text-center">
                          {formatCurrency(price || 0)}
                        </td>
                        <td className="quantity-col text-center">{quantity}</td>
                        <td className="total-col text-center">
                          {formatCurrency(totalProduct || 0)}
                        </td>
                      </RowWrapper>
                    );
                  })}
                  <RowWrapper id="total">
                    <td colSpan="3">
                      <strong
                        style={{
                          fontSize: "1.6rem",
                          lineHeight: "1.25",
                        }}
                      >
                        Total of order {orders?.[orderIndex]?.id}:
                      </strong>
                    </td>
                    <td
                      style={{
                        fontSize: "1.6rem",
                        lineHeight: "1.25",
                      }}
                    >
                      <strong>
                        {formatCurrency(orders?.[orderIndex]?.total || 0)}
                      </strong>
                    </td>
                  </RowWrapper>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <p>No order has been made yet.</p>
          <Button link={PATHS.PRODUCT.INDEX}>
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </>
      )}
    </div>
  );
};

export default OrderTab;
