import { useDispatch, useSelector } from "react-redux";
import {
  handleGetCart,
  handleRemoveFromCart,
  handleUpdateCart,
} from "../../store/reducer/cartReducer";
import { Children, useRef, useState } from "react";
import { cartService } from "../../services/cartService";
import { SHIPPING_OPTIONS } from "../../constants/general";
import { message } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import PATHS from "../../constants/paths";

function useCartPage() {
  const dispatch = useDispatch();
  const { cart, cartLoading } = useSelector((state) => state.cart);
  const { product, quantity, totalProduct, discount, shipping, total } =
    cart || [];
  const quantityRef = useRef([]);
  const handleDeleteProduct = (itemId) => {
    if (cartLoading || itemId < 0) return;
    dispatch(handleRemoveFromCart({ itemId }));
  };
  const updateQuantityTimeout = useRef();
  const handleUpdateQuantity = (updatedQuantity, updatedIndex) => {
    // Prepare payload
    const getPayload = () => {
      const newQuantity = quantity?.map((item, index) =>
        updatedIndex === index ? updatedQuantity : item
      );
      const newTotalProduct = totalProduct?.map((item, index) =>
        updatedIndex === index
          ? product[updatedIndex]?.price * updatedQuantity
          : item
      );
      const newSubTotal =
        newTotalProduct?.reduce((prev, current) => prev + current, 0) || 0;
      const newTotal = newSubTotal - (discount ?? 0) + (shipping?.price ?? 0);
      return {
        ...cart,
        product: product?.map((item) => item?.id),
        quantity: newQuantity,
        totalProduct: newTotalProduct,
        subTotal: newSubTotal,
        total: newTotal,
      };
    };

    if (updateQuantityTimeout.current) {
      clearTimeout(updateQuantityTimeout.current);
    }

    updateQuantityTimeout.current = setTimeout(async () => {
      if (
        updatedQuantity !== "" &&
        !cartLoading &&
        quantity[updatedIndex] !== updatedQuantity
      ) {
        try {
          const res = await dispatch(handleUpdateCart(getPayload())).unwrap();
          if (res) {
            dispatch(handleGetCart());
          }
        } catch (error) {
          quantityRef.current[updatedIndex]?.reset?.();
          console.log("error", error);
        }
      }
    }, 300);
  };

  const handleUpdateShipping = (typeShip) => {
    const newShipping = {
      typeShip: typeShip,
      price: SHIPPING_OPTIONS.find((item) => item.value === typeShip).price,
    };
    const newSubTotal =
      totalProduct?.reduce((prev, current) => prev + current, 0) || 0;
    const newTotal = newSubTotal - (discount ?? 0) + (newShipping?.price ?? 0);
    const updatePayload = {
      ...cart,
      product: product?.map((item) => item?.id),
      shipping: newShipping,
      subTotal: newSubTotal,
      total: newTotal,
    };
    if (typeShip !== "") {
      dispatch(handleUpdateCart(updatePayload));
    } else {
      message.warning("Select a shipping method");
    }
  };

  const cartTableProps = {
    products: product?.map((product, index) => {
      return {
        ...product,
        quantity: cart?.quantity?.[index],
        totalProduct: cart?.totalProduct?.[index],
        variant: cart?.variant?.[index],
      };
    }),
    handleDeleteProduct,
    handleUpdateQuantity,
    quantityRef,
    loading: cartLoading,
  };

  const cartSummaryProps = {
    total: total,
    subTotal: totalProduct?.reduce((prev, current) => prev + current, 0) || 0,
    handleUpdateShipping,

    shipping,
  };
  return { cartTableProps, cartSummaryProps };
}
export default useCartPage;
