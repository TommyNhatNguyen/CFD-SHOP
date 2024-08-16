import React, { useEffect, useState } from "react";
import CheckOutBilling from "./CheckOutBilling";
import CheckOutSummary from "./CheckOutSummary";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { message } from "antd";
import useAddress from "../../../hooks/useAddress";
import PATHS from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { PAYMENT_METHODS } from "../../../constants/general";
import { orderService } from "../../../services/orderService";

const CheckOutForm = ({ handleCheckOut }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.transfer);
  const _onSelectPaymentMethod = (method) => {
    if (method) {
      setPaymentMethod(method);
    }
  };
  const isCash = paymentMethod === PAYMENT_METHODS.cash;
  const isTransfer = paymentMethod === PAYMENT_METHODS.transfer;
  const { profile } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const { phone, email, firstName, province, ward, district, street } =
    profile || {};

  const {
    product,
    subTotal,
    shipping,
    total,
    quantity,
    variant,
    totalProduct,
    discount,
    discountCode,
  } = cart || {};

  const {
    wardId,
    provinceId,
    districtId,
    provinces,
    districts,
    wards,
    handleDistrictChange,
    handleProvinceChange,
    handleWardChange,
  } = useAddress();

  const renderProductInfo = product?.map((item, index) => {
    return {
      ...item,
      quantity: quantity?.[index],
      variant: variant?.[index],
      totalProduct: totalProduct?.[index],
    };
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      phone,
      email,
      street,
      province,
      district,
      ward,
    },
  });

  useEffect(() => {
    reset({
      firstName,
      phone,
      email,
      street,
      province,
      district,
      ward,
    });
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onProvinceChange = (changedId) => {
    handleProvinceChange?.(changedId);
    reset({
      ...getValues(),
      province: changedId,
      district: undefined,
      ward: undefined,
    });
  };
  const _onDistrictChange = (changedId) => {
    handleDistrictChange(changedId);
    reset({
      ...getValues(),
      district: changedId,
      ward: undefined,
    });
  };
  const _onWardChange = (changedId) => {
    handleWardChange(changedId);
    reset({
      ...getValues(),
      ward: changedId,
    });
  };

  const _onSubmit = (data) => {
    const { district, email, firstName, note, phone, province, street, ward } =
      data;
    const provinceName = provinces?.find(
      (item) => item.value === province
    )?.label;
    const districtName = districts?.find(
      (item) => item.value === district
    )?.label;
    const wardName = wards?.find((item) => item.value === ward)?.label;
    if (!paymentMethod) {
      message.warning("Please select a payment method");
      return;
    }
    if (!shipping) {
      message.warning("Please select a shipping method");
      return;
    }
    const payload = {
      address: {
        phone: phone,
        email: email,
        fullName: firstName,
        street: `${street}, ${wardName}, ${districtName}, ${provinceName}`,
      },
      shipping: {
        typeShip: shipping?.typeShip,
        price: shipping?.price,
      },
      variant: variant,
      subTotal: subTotal,
      total: total,
      product: product?.map((item) => item.id),
      quantity: quantity,
      totalProduct: totalProduct,
      discount: discount,
      discountCode: discountCode || "",
      paymentMethod: paymentMethod,
      note: note || "",
    };
    handleCheckOut?.(payload, async () => {
      try {
        const res = await orderService.getOrders();
        if (res?.data?.data) {
          const orders = res?.data?.data?.orders;
          const latestOrder = orders?.slice(-1)?.[0] || "";
          if (latestOrder) {
            navigate(
              `${PATHS.CHECKOUT.INDEX}-success/${latestOrder?.id || ""}`
            );
          }
        }
      } catch (error) {
        console.log("error", error);
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(_onSubmit)} className="checkout-form">
      <div className="row">
        <CheckOutBilling
          register={register}
          errors={errors}
          control={control}
          provinces={provinces}
          provinceId={provinceId}
          _onProvinceChange={_onProvinceChange}
          districts={districts}
          districtId={districtId}
          _onDistrictChange={_onDistrictChange}
          wards={wards}
          wardId={wardId}
          _onWardChange={_onWardChange}
        />
        <CheckOutSummary
          renderProductInfo={renderProductInfo}
          shipping={shipping}
          discountCode={discountCode}
          discount={discount}
          total={total}
          subTotal={subTotal}
          _onSelectPaymentMethod={_onSelectPaymentMethod}
          isTransfer={isTransfer}
          isCash={isCash}
        />
      </div>
    </form>
  );
};

export default CheckOutForm;
