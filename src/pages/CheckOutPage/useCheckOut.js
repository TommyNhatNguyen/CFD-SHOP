import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../../services/orderService";
import {
  handleGetCart,
  handleUpdateCacheCart,
} from "../../store/reducer/cartReducer";

function useCheckOut() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const handleAddCoupon = async (discountCode) => {
    try {
      const res = await orderService.getVoucher(`/${discountCode}`);
      const couponInfo = res?.data?.data;
      if (couponInfo) {
        const { subTotal, shipping } = cart || {};
        const updatePayload = {
          ...cart,
          discount: couponInfo.value || 0,
          discountCode: couponInfo.code || "",
          total: subTotal - (couponInfo?.value || 0) + (shipping?.price || 0),
        };
        dispatch(handleUpdateCacheCart(updatePayload));
        message.success("Voucher added successful");
      }
    } catch (error) {
      console.log("error", error);
      message.error(error.response.data.message);
    }
  };

  const handleRemoveCoupon = () => {
    try {
      if (cart?.discountCode) {
        const { subTotal, shipping } = cart || {};
        const updatePayload = {
          ...cart,
          discount: 0,
          discountCode: "",
          total: subTotal + (shipping?.price || 0),
        };
        dispatch(handleUpdateCacheCart(updatePayload));
        message.success("Voucher remove successful");
      }
    } catch (error) {
      console.log("error", error);
      message.error(error.response.data.message);
    }
  };

  const checkoutDiscountProps = {
    handleAddCoupon,
    handleRemoveCoupon,
    addedCoupon: cart?.discountCode || "",
  };
  const handleCheckOut = async (payload, callback) => {
    try {
      const res = await orderService.checkout(payload);
      if (res?.data?.data) {
        message.success("Checkout Successful");
        dispatch(handleGetCart());
        callback?.();
      }
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message[0]);
    }
  };
  const checkoutFormProps = { handleCheckOut };
  return { checkoutDiscountProps, checkoutFormProps };
}
export default useCheckOut;
