import React, { useState } from "react";
import { MODAL, MODAL_FORM } from "../../../constants/modal";
import Input from "../../Input";
import Button from "../../Button";
import CheckBox from "../../CheckBox";
import { REGEX } from "../../../utils/regex";
import { useAuthContext } from "../../../context/AuthContext";
import ComponentLoading from "../../ComponentLoading";
import classNames from "classnames";

const LoginForm = ({ modal }) => {
  const { handleLogin } = useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
    isRemember: false,
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const register = (registerField) => {
    return {
      name: registerField,
      error: error?.[registerField],
      value: form?.[registerField],
      onChange: (e) => {
        let formValue;
        if (registerField === MODAL_FORM.LOGIN.isRemember) {
          formValue = e.target.checked;
        } else {
          formValue = e.target.value;
        }
        setForm((prev) => {
          return { ...prev, [registerField]: formValue };
        });
      },
    };
  };
  const _onSubmitForm = (e) => {
    e.preventDefault();
    // --- Handle Error
    const errorObject = {};
    if (!!!form?.email) {
      errorObject.email = "Please fill in this field";
    } else if (!!!REGEX.isEmail(form?.email)) {
      errorObject.email = "Enter a valid email";
    }
    if (!!!form?.password) {
      errorObject.password = "Please fill in this field";
    }
    // --- Handle Submit
    if (Object.keys(errorObject).length > 0) {
      // Error
      setError(errorObject);
    } else {
      // Success
      setError({});
      setLoading(true);
      handleLogin(form, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
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
      <form action="#">
        <Input
          label="Username or email address"
          required
          {...register(MODAL_FORM.LOGIN.email)}
        />
        <Input
          label="Password"
          required
          {...register(MODAL_FORM.LOGIN.password)}
        />
        {/* End .form-group */}
        <div className="form-footer">
          <Button type="submit" onClick={_onSubmitForm}>
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <CheckBox
            label="Remember Me"
            {...register(MODAL_FORM.LOGIN.isRemember)}
          />
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
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login btn-f">
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
