import React from "react";
import InputUseForm from "../../../components/InputUseForm";
import { Controller, useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";
import { REGEX } from "../../../utils/regex";
import { SelectWrapper } from "../../../components/StyledComponents";
import { Select } from "antd";
import removeAccents from "../../../utils/removeAccents";

const CheckOutBilling = ({
  register,
  errors,
  control,
  provinces,
  provinceId,
  _onProvinceChange,
  districts,
  districtId,
  _onDistrictChange,
  wards,
  wardId,
  _onWardChange,
}) => {
  return (
    <div className="col-lg-9">
      <h2 className="checkout-title">Billing Details</h2>
      <div className="row">
        <InputUseForm
          type="text"
          label="Full Name"
          required
          className="col-sm-4"
          {...register("firstName", { required: MESSAGE.required })}
          error={errors?.firstName?.message}
        />
        <InputUseForm
          type="number"
          label="Phone number"
          required
          className="col-sm-4"
          {...register("phone", {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.phone,
              message: MESSAGE.phone,
            },
          })}
          error={errors?.phone?.message}
        />
        <InputUseForm
          type="email"
          label="Email address"
          required
          className="col-sm-4"
          {...register("email", {
            required: MESSAGE.required,
            pattern: {
              value: REGEX.email,
              message: MESSAGE.email,
            },
          })}
          error={errors?.email?.message}
        />
      </div>
      <div className="row">
        <div className="col-sm-4">
          <label>Province/City *</label>
          <Controller
            name="province"
            control={control}
            rules={{
              required: MESSAGE.required,
            }}
            render={({ formState: { errors } }) => {
              return (
                <SelectWrapper>
                  <Select
                    showSearch
                    className="form-control form-select"
                    suffixIcon={<></>}
                    placeholder="Please select Province/City"
                    options={provinces}
                    value={provinceId || undefined}
                    optionFilterProp="children"
                    onChange={_onProvinceChange}
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                  />
                  {!!errors && (
                    <p className="form-error">{errors?.province?.message}</p>
                  )}
                </SelectWrapper>
              );
            }}
          />
        </div>
        <div className="col-sm-4">
          <label>District/Town *</label>
          <Controller
            name="district"
            control={control}
            rules={{
              required: MESSAGE.required,
            }}
            render={({ formState: { errors } }) => {
              return (
                <SelectWrapper>
                  <Select
                    showSearch
                    className="form-control form-select"
                    suffixIcon={<></>}
                    placeholder="Please select a district"
                    options={districts}
                    value={districtId || undefined}
                    optionFilterProp="children"
                    onChange={_onDistrictChange}
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                  />
                  {!!errors && (
                    <p className="form-error">{errors?.district?.message}</p>
                  )}
                </SelectWrapper>
              );
            }}
          />
        </div>
        <div className="col-sm-4">
          <label>Ward *</label>
          <Controller
            name="ward"
            control={control}
            rules={{
              required: MESSAGE.required,
            }}
            render={({ formState: { errors } }) => {
              return (
                <SelectWrapper>
                  <Select
                    showSearch
                    className="form-control form-select"
                    suffixIcon={<></>}
                    placeholder="Please select a ward"
                    options={wards}
                    value={wardId || undefined}
                    optionFilterProp="children"
                    onChange={_onWardChange}
                    filterOption={(input, option) =>
                      removeAccents(option?.label ?? "")
                        .toLowerCase()
                        .includes(removeAccents(input.toLowerCase()))
                    }
                  />
                  {!!errors && (
                    <p className="form-error">{errors?.ward?.message}</p>
                  )}
                </SelectWrapper>
              );
            }}
          />
        </div>
      </div>
      <InputUseForm
        type="text"
        label="Street address"
        placeholder="House number and Street name"
        required
        {...register("street", {
          required: MESSAGE.required,
        })}
        error={errors?.street?.message}
      />
      <InputUseForm
        renderInput={(inputProps) => {
          return (
            <>
              <label>Order notes (optional)</label>
              <textarea
                {...inputProps}
                {...register("note")}
                className="form-control"
                cols={30}
                rows={4}
                placeholder="Notes about your order, e.g. special notes for delivery"
              />
            </>
          );
        }}
      />
    </div>
  );
};

export default CheckOutBilling;
