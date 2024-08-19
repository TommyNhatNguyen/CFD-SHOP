import React, { useEffect } from "react";
import InputUseForm from "../../../components/InputUseForm";
import ChangePasswordTab from "./ChangePasswordTab";
import { Controller, useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";
import { REGEX } from "../../../utils/regex";
import { useDispatch, useSelector } from "react-redux";
import { Select, message } from "antd";
import dayjs from "dayjs";
import { authService } from "../../../services/authService";
import { handleGetProfile } from "../../../store/reducer/authReducer";
import { SelectWrapper } from "../../../components/StyledComponents";
import useAddress from "../../../hooks/useAddress";
import removeAccents from "../../../utils/removeAccents";
import classNames from "classnames";

const AccountDetailTab = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const {
    firstName,
    lastName,
    email,
    phone,
    birthday,
    street,
    province,
    district,
    ward,
  } = profile || {};

  const {
    provinces,
    districts,
    wards,
    wardId,
    provinceId,
    districtId,
    handleProvinceChange,
    handleDistrictChange,
    handleWardChange,
  } = useAddress();

  const {
    handleSubmit,
    reset,
    getValues,
    register,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      phone,
      birthday,
      street,
      province,
      district,
      ward,
    },
  });
  useEffect(() => {
    if (profile) {
      reset({
        firstName,
        lastName,
        email,
        phone,
        birthday: profile?.birthday
          ? dayjs(profile?.birthday || "2000-10-14").format("YYYY-MM-DD")
          : "",
        street,
        province,
        district,
        ward,
      });
    }
    handleProvinceChange?.(province);
    handleDistrictChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);

  const _onSubmit = async (data) => {
    const _payload = {
      ...data,
      lastName: profile?.lastName || profile?.firstName,
    };
    console.log(_payload);
    try {
      const res = await authService.updateProfile(_payload);
      if (res?.data?.data) {
        message.success("Update profile successful");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message);
    }
  };
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
  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form onSubmit={handleSubmit(_onSubmit)} className="account-form">
        <div className="row">
          <InputUseForm
            type="text"
            className="col-sm-6"
            label="Full Name"
            required
            {...register("firstName", { required: MESSAGE.required })}
            error={errors?.firstName?.message}
          />
          <InputUseForm
            type="email"
            className="col-sm-6"
            label="Email address"
            required
            disabled
            {...register("email", {
              required: MESSAGE.required,
              pattern: {
                value: REGEX.email,
                message: MESSAGE.email,
              },
            })}
            error={errors?.firstName?.message}
          />
        </div>
        <div className="row">
          <InputUseForm
            type="text"
            className="col-sm-6"
            label="Phone number"
            required
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
            type="date"
            className="col-sm-6"
            label="Birth Date"
            required
            {...register("birthday", { required: MESSAGE.required })}
            error={errors?.birthday?.message}
          />
        </div>
        {/* ------ */}
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <SelectWrapper>
                    <Select
                      showSearch
                      className={classNames("form-control form-select", {
                        "input-error": errors?.province?.message,
                      })}
                      suffixIcon={<></>}
                      placeholder="Please select Province/City"
                      onChange={_onProvinceChange}
                      options={provinces}
                      value={provinceId || undefined}
                      optionFilterProp="children"
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
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <SelectWrapper>
                    <Select
                      showSearch
                      className={classNames("form-control form-select", {
                        "input-error": errors?.district?.message,
                      })}
                      suffixIcon={<></>}
                      placeholder="Please select a district"
                      onChange={_onDistrictChange}
                      options={districts}
                      value={districtId || undefined}
                      optionFilterProp="children"
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
              rules={{ required: MESSAGE.required }}
              render={({ formState: { errors } }) => {
                return (
                  <SelectWrapper>
                    <Select
                      showSearch
                      className={classNames("form-control form-select", {
                        "input-error": errors?.ward?.message,
                      })}
                      suffixIcon={<></>}
                      placeholder="Please select a ward"
                      onChange={_onWardChange}
                      options={wards}
                      value={wardId || undefined}
                      optionFilterProp="children"
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
        {/* ------ */}
        <InputUseForm
          type="text"
          label="Street address"
          required
          {...register("street", { required: MESSAGE.required })}
          error={errors?.street?.message}
        />
        <button type="submit" className="btn btn-outline-primary-2">
          <span>SAVE CHANGES</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default AccountDetailTab;
