import React, { useEffect } from "react";
import Button from "../../../components/Button";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";

const CheckOutDiscountWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  .checkout-discount {
    height: 100%;
    max-width: 350px;
    flex: 1 0 200px;
    margin: 0 !important;
    form {
      height: 100%;
      margin-right: 10px;
      input {
        height: 100%;
        margin: 0 !important;
      }
      label {
        height: 100%;
        top: 65%;
      }
    }
  }
`;

const CheckOutDiscount = ({
  addedCoupon,
  handleAddCoupon,
  handleRemoveCoupon,
}) => {
  useEffect(() => {
    $("#checkout-discount-input")
      .on("focus", function () {
        // Hide label on focus
        $(this).parent("form").find("label").css("opacity", 0);
      })
      .on("blur", function () {
        // Check if input is empty / toggle label
        var $this = $(this);

        if ($this.val().length !== 0) {
          $this.parent("form").find("label").css("opacity", 0);
        } else {
          $this.parent("form").find("label").css("opacity", 1);
        }
      });
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: addedCoupon });

  useEffect(() => {
    reset({
      discountCode: addedCoupon,
    });
  }, [addedCoupon]);

  const _onAddCoupon = (data) => {
    const { discountCode } = data;
    if (discountCode) {
      handleAddCoupon?.(discountCode);
    }
  };
  return (
    <CheckOutDiscountWrapper>
      <div className="checkout-discount">
        <form>
          <input
            type="text"
            className="form-control"
            required
            id="checkout-discount-input"
            {...register("discountCode", { required: MESSAGE.required })}
          />
          <label
            htmlFor="checkout-discount-input"
            className="text-truncate"
            style={{ opacity: addedCoupon ? 0 : 1 }}
          >
            Have a coupon? <span>Click here to enter your code</span>
          </label>
          {errors?.discountCode && (
            <p className="form-error">{errors?.discountCode?.message}</p>
          )}
        </form>
      </div>
      {!addedCoupon ? (
        <Button variant="primmary2" onClick={handleSubmit(_onAddCoupon)}>
          Add
        </Button>
      ) : (
        <Button variant="primmary2" onClick={handleSubmit(handleRemoveCoupon)}>
          Remove
        </Button>
      )}
    </CheckOutDiscountWrapper>
  );
};

export default CheckOutDiscount;
