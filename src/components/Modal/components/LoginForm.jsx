import React, { useState } from "react";
import Button from "../../Button";
import CheckBox from "../../CheckBox";

import ComponentLoading from "../../ComponentLoading";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";
import { REGEX } from "../../../utils/regex";
import InputUseForm from "../../InputUseForm";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../../store/reducer/authReducer";
import { message } from "antd";

const LoginForm = ({ modal }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const _onSubmitForm = async (data) => {
    setLoading(true);
    if (data && !loading) {
      try {
        const res = await dispatch(handleLogin(data));
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const _onSocialLogin = (e) => {
    e.preventDefault();
    message.warning("Feature not supported yet!");
  };
  return (
    <div
      className={classNames("tab-pane fade active", {
        show: !!modal,
      })}
      id="signin"
      role="tabpanel"
      aria-labelledby="signin-tab"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <form onSubmit={handleSubmit(_onSubmitForm)}>
        <InputUseForm
          label="Username or email address"
          required
          {...register("email", {
            required: MESSAGE.required,
            pattern: { value: REGEX.email, message: MESSAGE.email },
          })}
          error={errors?.email?.message || ""}
        />
        <InputUseForm
          label="Password"
          type="password"
          required
          {...register("password", { required: MESSAGE.required })}
          error={errors?.password?.message || ""}
        />

        {/* End .form-group */}
        <div className="form-footer">
          <Button type="submit">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <CheckBox label="Remember Me" {...register("isRemember")} />
          {/* End .custom-checkbox */}
          <a href="#" className="forgot-link">
            Forgot Your Password?
          </a>
        </div>
        {/* End .form-footer */}
      </form>
      <div className="form-choice">
        <p className="text-center">or sign in with</p>
        <div className="row">
          <div className="col-sm-6">
            <a
              href="#"
              className="btn btn-login btn-g"
              onClick={_onSocialLogin}
            >
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a
              href="#"
              className="btn btn-login btn-f"
              onClick={_onSocialLogin}
            >
              <i className="icon-facebook-f" />
              Login With Facebook
            </a>
          </div>
          {/* End .col-6 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .form-choice */}
    </div>
  );
};

export default LoginForm;
