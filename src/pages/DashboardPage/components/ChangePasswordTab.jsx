import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputUseForm from "../../../components/InputUseForm";
import { MESSAGE } from "../../../constants/message";
import { message } from "antd";
import { authService } from "../../../services/authService";
import { handleGetProfile } from "../../../store/reducer/authReducer";
import Button from "../../../components/Button";

const ChangePasswordTab = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  currentPasswordRef.current = watch()?.currentPassword;
  newPasswordRef.current = watch()?.newPassword;
  const _onSubmit = async (data) => {
    const _payload = {
      ...profile,
      password: data?.currentPassword,
      newPassword: data?.newPassword,
    };
    try {
      const res = await authService.updateProfile(_payload);
      if (res?.data?.data) {
        reset();
        message.success("Update password successful");
        dispatch(handleGetProfile());
      }
    } catch (error) {
      console.log("error", error);
      if (error?.response?.data?.message === "password sai") {
        message.error("Wrong current password");
        reset();
        return;
      }
      reset();
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <form onSubmit={handleSubmit(_onSubmit)}>
      <InputUseForm
        type="password"
        label="Current password (leave blank to leave unchanged)"
        required
        {...register("currentPassword", { required: MESSAGE.required })}
        error={errors?.currentPassword?.message}
      />
      <InputUseForm
        type="password"
        label="New password (leave blank to leave unchanged)"
        {...register("newPassword", {
          validate: (value) =>
            value !== currentPasswordRef.current ||
            "Your current password can't be with new password",
        })}
        error={errors?.newPassword?.message}
      />
      <InputUseForm
        type="password"
        label="Confirm new password"
        {...register("confirmPassword", {
          validate: (value) =>
            value === newPasswordRef.current ||
            "Confirm new password doesn't match",
        })}
        error={errors?.confirmPassword?.message}
      />

      <Button type="submit">
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right" />
      </Button>
    </form>
  );
};

export default ChangePasswordTab;
