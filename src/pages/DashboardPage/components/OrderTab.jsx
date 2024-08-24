import React, { Fragment, useEffect, useState } from "react";
import useQuery from "../../../hooks/useQuery";
import { orderService } from "../../../services/orderService";
import PATHS from "../../../constants/paths";
import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "../../../utils/format";
import styled from "styled-components";
import Button from "../../../components/Button";
import classNames from "classnames";

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

const OrderWrapper = styled.div`
  background-color: #fafafa;
  padding: 1.6rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  .order-title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      opacity: 0.5;
    }
    .icon {
      max-width: 20px;
      transform: rotate(-90deg);
    }
    .title {
      margin: initial;
      font-weight: 600;
      font-size: 1.8rem;
      line-height: 1.22;
      letter-spacing: -0.01em;
    }
  }
  .order-contentwrapper {
    margin: initial;
    display: none;
    .order-content {
      padding: 1.6rem 2rem;
      border: 0.1rem solid #ebebeb;
      margin: initial;
      p {
        span {
          color: #1a1a1a;
          font-weight: 400;
        }
      }
    }
    .table-cart {
      .product-col {
        .product {
          background-color: initial;
        }
      }
    }
    .order-summary {
      p {
        font-size: 1.8rem;
        letter-spacing: -0.025em;
        span {
          color: #1a1a1a;
          font-weight: 400;
        }
      }
    }
  }
  &.active {
    .order-title {
      margin-bottom: 1rem;
      .icon {
        transform: initial;
      }
    }
    .order-contentwrapper {
      display: initial;
    }
  }
`;

const OrderTab = () => {
  const { data: ordersData } = useQuery(orderService.getOrders);
  const orders = ordersData?.orders || [];
  const [orderShow, setOrderShow] = useState([]);
  const modifiedOrders = orders?.map((order, index) => {
    return [
      ...order?.product?.map((product, productIndex) => {
        return {
          ...product,
          quantity: order?.quantity?.[productIndex],
          totalProduct: order?.totalProduct?.[productIndex],
          variant: order?.variant?.[productIndex],
          isReview: order?.isReview?.[productIndex],
          orderId: order?.id,
        };
      }),
    ];
  });
  const _onOrderShow = (e, orderId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(orderShow?.includes(orderId));
    if (!orderShow?.includes(orderId)) {
      setOrderShow((prev) => [...prev, orderId]);
      return;
    }
    if (orderShow?.includes(orderId)) {
      setOrderShow((prev) => prev.filter((item) => item !== orderId));
      return;
    }
  };
  useEffect(() => {
    const firstOrderId = orders?.[0]?.id;
    if (!orderShow?.includes(firstOrderId)) {
      setOrderShow((prev) => [...prev, firstOrderId]);
    }
  }, [orders]);
  return (
    <div
      className="tab-pane fade show active"
      id="tab-orders"
      role="tabpanel"
      aria-labelledby="tab-orders-link"
      // style={{
      //   maxHeight: "2000px",
      //   overflowY: "scroll",
      // }}
    >
      {orders?.length > 0 ? (
        modifiedOrders?.map((order, orderIndex) => {
          const orderId = orders?.[orderIndex]?.id;
          const orderDate = formatDate(orders?.[orderIndex]?.createdAt || 0);
          const orderTotal = formatCurrency(orders?.[orderIndex]?.total || 0);
          const orderSubtotal = formatCurrency(
            orders?.[orderIndex]?.subTotal || 0
          );
          const orderDiscount = formatCurrency(
            orders?.[orderIndex]?.discount || 0
          );
          const fullName =
            orders?.[orderIndex]?.address?.fullName ||
            orders?.[orderIndex]?.customer?.firstName;
          const email =
            orders?.[orderIndex]?.address?.email ||
            orders?.[orderIndex]?.customer?.email;
          const note = orders?.[orderIndex]?.note;
          const phone = orders?.[orderIndex]?.address?.phone;
          const address = orders?.[orderIndex]?.address?.street;
          const shippingType = orders?.[orderIndex]?.shipping?.typeShip;
          return (
            <OrderWrapper
              key={orderId || orderIndex}
              className={classNames("order-wrapper", {
                active: orderShow?.includes(orderId),
              })}
            >
              <div
                className="order-title"
                onClick={(e) => _onOrderShow(e, orderId)}
              >
                <div className="icon">
                  <img src="/assets/images/arrow-down-icon.png" />
                </div>
                <h2 className="title">Order code: {orderId || ""}</h2>
                <span>({orderDate})</span>
              </div>
              <div className="order-contentwrapper">
                <div className="order-content row">
                  <div className="col-lg-6">
                    <p>
                      Name: <span>{fullName || ""}</span>
                    </p>
                    <p>
                      Email: <span>{email || ""}</span>
                    </p>
                    <p>
                      Note: <span>{note || ""}</span>
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p>
                      Phone: <span>{phone || "0909284493"}</span>
                    </p>
                    <p>
                      Address: <span>{address || ""}</span>
                    </p>
                    <p>
                      Type Shipping:{" "}
                      <span>{shippingType.toUpperCase() || ""}</span>
                    </p>
                  </div>
                </div>
                <table className="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Quantity</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Review</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.map((product, index) => {
                      const {
                        id,
                        slug,
                        images,
                        quantity,
                        isReview,
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
                                  <img
                                    src={imgPath || ""}
                                    alt="Product image"
                                  />
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
                          <td className="quantity-col text-center">
                            {quantity}
                          </td>
                          <td className="total-col text-center">
                            {formatCurrency(totalProduct || 0)}
                          </td>
                          <td className="text-center">
                            {isReview ? (
                              <div
                                style={{
                                  maxWidth: 20,
                                  textAlign: "center",
                                  margin: "auto",
                                }}
                              >
                                <img src="/assets/images/check-icon.png" />
                              </div>
                            ) : (
                              <>
                                Please rate this product -{" "}
                                <Link
                                  to={productPath}
                                  state={{
                                    order: orders?.[orderIndex]?.id,
                                    product: id,
                                  }}
                                >
                                  Rate
                                </Link>
                              </>
                            )}
                          </td>
                        </RowWrapper>
                      );
                    })}
                  </tbody>
                </table>
                <div className="order-summary row">
                  <div className="col-sm">
                    <p>
                      Subtotal: <span>{orderSubtotal || 0}</span>
                    </p>
                  </div>
                  <div className="col-sm">
                    <p>
                      Discount: <span>{orderDiscount || 0}</span>
                    </p>
                  </div>
                  <div className="col-sm">
                    <p>
                      Total: <span>{orderTotal || 0}</span>
                    </p>
                  </div>
                </div>
              </div>
            </OrderWrapper>
          );
        })
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
