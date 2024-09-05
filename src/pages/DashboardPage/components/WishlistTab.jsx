import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PATHS from "../../../constants/paths";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../../utils/format";
import classNames from "classnames";
import { Modal, message } from "antd";
import { handleRemoveWhiteList } from "../../../store/reducer/authReducer";
import { handleAddCart } from "../../../store/reducer/cartReducer";
import { ProductTitleWrapper } from "../../../components/StyledComponents";

const WishlistTab = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const { whiteList } = profile || {};
  const { confirm } = Modal;
  const _onAddToCart = async (data) => {
    const { id: addedId, color, price: addedPrice } = data;
    const addedQuantity = 1;
    const addedColor = color?.[0];
    const _payload = {
      addedId,
      addedColor,
      addedQuantity,
      addedPrice,
    };
    try {
      const res = await dispatch(handleAddCart(_payload)).unwrap();
      if (res) {
        dispatch(handleRemoveWhiteList({ product: _payload.addedId }));
      }
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
    }
    console.log(_payload);
  };
  const _onRemoveFromWhiteList = (productId) => {
    const removeProduct = whiteList?.find((item) => item?.id === productId);
    const _payload = {
      product: productId,
    };
    confirm({
      title: "Do you want remove this item from Wishlist?",
      content: (
        <>
          <p>{removeProduct.name || ""}</p>
        </>
      ),
      onOk() {
        dispatch(handleRemoveWhiteList(_payload));
        message.success("Item removed");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div
      className="tab-pane fade show active"
      id="tab-wishlist"
      role="tabpanel"
      aria-labelledby="tab-wishlist-link"
    >
      {whiteList?.length < 1 ? (
        <>
          <p>No product has been added yet.</p>
          <Button link={PATHS.PRODUCT.INDEX}>
            <span>GO SHOP</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </>
      ) : (
        <table className="table table-wishlist table-mobile">
          <thead>
            <tr>
              <th>Product</th>
              <th className="text-center">Price</th>
              <th className="text-center">Stock Status</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {whiteList?.map((item, index) => {
              const { id, slug, images, price, stock, name, color } =
                item || {};
              const productPath = `${PATHS.PRODUCT.INDEX}/${slug}`;
              let imgPath = images?.[0];
              if (imgPath?.split("https")?.length > 2) {
                imgPath = imgPath?.split("https");
                imgPath = "https" + imgPath?.slice(-1);
              } else {
                imgPath =
                  "https://cfdshop.hn.ss.bfcplatform.vn/images/product/" +
                  imgPath;
              }
              const isInStock = Number(stock) > 0;
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
                        {/* <div className="cart-product-color">
                          <span>Color: </span>
                          <ColorSelect colors={color} />
                        </div> */}
                      </ProductTitleWrapper>
                    </div>
                  </td>
                  <td className="price-col text-center">
                    {formatCurrency(price || 0)}
                  </td>
                  <td className="stock-col text-center">
                    <span
                      className={classNames({
                        "in-stock": isInStock,
                        "out-of-stock": !isInStock,
                      })}
                    >
                      {isInStock ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                  <td className="action-col">
                    <Button
                      className="btn btn-block"
                      onClick={() => _onAddToCart(item)}
                      style={{
                        pointerEvents: !isInStock ? "none" : "all",
                        backgroundColor: !isInStock ? "rgba(0,0,0, 0.1)" : "",
                      }}
                    >
                      <i className="icon-cart-plus" />
                      <span>{!isInStock ? "Out of stock" : "add to cart"}</span>
                    </Button>
                  </td>
                  <td className="remove-col">
                    <button
                      className="btn-remove"
                      onClick={() => _onRemoveFromWhiteList(id)}
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
    </div>
  );
};

export default WishlistTab;
