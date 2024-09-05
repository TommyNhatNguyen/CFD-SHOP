import React, { useEffect, useState } from "react";
import { REGEX } from "../../../utils/regex";
import Button from "../../Button";
import CheckBox from "../../CheckBox";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";

import classNames from "classnames";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";
import InputUseForm from "../../InputUseForm";
import ComponentLoading from "../../ComponentLoading";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleRegister } from "../../../store/reducer/authReducer";
const RegisterForm = ({ modal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (errors?.isAgree) {
      message.warning("Please agree with our policy to continue");
    }
  }, [errors?.isAgree]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const _onHandleSubmit = async (data) => {
    setLoading(true);
    if (data && !loading) {
      try {
        const res = await dispatch(handleRegister(data)).unwrap();
        console.log("res", res);
      } catch (error) {
        console.log(error);
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
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <form onSubmit={handleSubmit(_onHandleSubmit)}>
        <InputUseForm
          label="Your email address"
          required
          {...register("email", {
            required: MESSAGE.required,
            pattern: { value: REGEX.email, message: MESSAGE.email },
          })}
          error={errors?.email?.message}
        />
        <InputUseForm
          label="Password"
          required
          {...register("password", {
            required: MESSAGE.required,
          })}
          error={errors?.password?.message}
        />
        <div className="form-footer">
          <Button type="submit">
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <CheckBox
            label="I agree to the&nbsp;"
            required
            {...register("isAgree", {
              required: MESSAGE.required,
            })}
          >
            <Link to={PATHS.PRIVACY}>privacy policy</Link>
          </CheckBox>
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
              className="btn btn-login  btn-f"
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

export default RegisterForm;
