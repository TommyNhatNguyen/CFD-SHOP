import React, { useState } from "react";
import { MODAL, MODAL_FORM } from "../../../constants/modal";
import Input from "../../Input";
import { REGEX } from "../../../utils/regex";
import Button from "../../Button";
import CheckBox from "../../CheckBox";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import { useAuthContext } from "../../../context/AuthContext";
import classNames from "classnames";

const RegisterForm = ({ modal }) => {
  const { handleRegister, messageApi } = useAuthContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
    isAgree: false,
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
        if (registerField === MODAL_FORM.REGISTER.isAgree) {
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
    } else if (!!!(form?.password?.length > 6)) {
      errorObject.password = "Password length must be more than 6 characters";
    }
    if (!!!form?.isAgree) {
      errorObject.isAgree = "Agree to the privacy policy to proceed";
      // Call message API
      messageApi.warning("Agree to the privacy policy to proceed");
    }
    // --- Handle Submit
    if (Object.keys(errorObject).length > 0) {
      // Error
      setError(errorObject);
    } else {
      // Success
      setError({});
      setLoading(true);
      handleRegister(form, () => {
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
      id="register"
      role="tabpanel"
      aria-labelledby="register-tab"
      style={{ position: "relative" }}
    >
      {loading && <ComponentLoading />}
      <form action="#">
        <Input
          label="Your email address"
          required
          {...register(MODAL_FORM.REGISTER.email)}
        />
        <Input
          label="Password"
          required
          {...register(MODAL_FORM.REGISTER.password)}
        />
        <div className="form-footer">
          <Button type="submit" onClick={_onSubmitForm}>
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </Button>
          <CheckBox
            label="I agree to the&nbsp;"
            required
            {...register(MODAL_FORM.REGISTER.isAgree)}
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
            <a href="#" className="btn btn-login btn-g">
              <i className="icon-google" />
              Login With Google
            </a>
          </div>
          {/* End .col-6 */}
          <div className="col-sm-6">
            <a href="#" className="btn btn-login  btn-f">
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
