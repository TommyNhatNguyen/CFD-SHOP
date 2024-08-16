import React from "react";
import InputUseForm from "../../../components/InputUseForm";
import Button from "../../../components/Button";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../../constants/message";
import { REGEX } from "../../../utils/regex";
import classNames from "classnames";
import { message } from "antd";
import { subscribeService } from "../../../services/subscribeService";

const ContactInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const _onSubmit = async (data) => {
    try {
      const res = await subscribeService.subscribe(data);
      if (res?.data?.data) {
        message.success("We will contact you soon");
        reset();
      }
    } catch (error) {
      console.log("error", error);
      message.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="row">
      <div className="col-lg-6 mb-2 mb-lg-0">
        <h2 className="title mb-1">Contact Information</h2>
        <p className="mb-3">
          Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui,
          eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu,
          fermentum et, dapibus sed, urna.
        </p>
        <div className="row">
          <div className="col-sm-7">
            <div className="contact-info">
              <h3>The Office</h3>
              <ul className="contact-list">
                <li>
                  <i className="icon-map-marker" /> 70 Washington Square South
                  New York, NY 10012, United States
                </li>
                <li>
                  <i className="icon-phone" />
                  <a href="tel:0909284493">0909284493</a>
                </li>
                <li>
                  <i className="icon-envelope" />
                  <a href="mailto:nguyenanhnhat123456@gmail.com">
                    nguyenanhnhat123456@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="contact-info">
              <h3>The Office</h3>
              <ul className="contact-list">
                <li>
                  <i className="icon-clock-o" />
                  <span className="text-dark">Monday-Saturday</span>
                  <br />
                  11am-7pm ET
                </li>
                <li>
                  <i className="icon-calendar" />
                  <span className="text-dark">Sunday</span>
                  <br />
                  11am-6pm ET
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <h2 className="title mb-1">Got Any Questions?</h2>
        <p className="mb-2">
          Use the form below to get in touch with the sales team
        </p>
        <form onSubmit={handleSubmit(_onSubmit)} className="contact-form mb-3">
          <div className="row">
            <div className="col-sm-6">
              <InputUseForm
                labelClassName="sr-only"
                placeholder="Name *"
                {...register("name", {
                  required: MESSAGE.required,
                })}
                error={errors?.name?.message}
              />
            </div>
            <div className="col-sm-6">
              <InputUseForm
                labelClassName="sr-only"
                placeholder="Email *"
                {...register("email", {
                  required: MESSAGE.required,
                  pattern: { value: REGEX.email, message: MESSAGE.email },
                })}
                error={errors?.email?.message}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <InputUseForm
                labelClassName="sr-only"
                placeholder="Phone"
                {...register("phone", {
                  pattern: { value: REGEX.phone, message: MESSAGE.phone },
                })}
                error={errors?.phone?.message}
              />
            </div>
            <div className="col-sm-6">
              <InputUseForm
                labelClassName="sr-only"
                placeholder="Subject"
                {...register("title")}
                error={errors?.title?.message}
              />
            </div>
          </div>
          <InputUseForm
            labelClassName="sr-only"
            placeholder="Message *"
            renderInput={(inputProps) => {
              return (
                <textarea
                  className={classNames("form-control", {
                    "input-error": errors?.description?.message,
                  })}
                  cols={30}
                  rows={4}
                  {...inputProps}
                  {...register("description", { required: MESSAGE.required })}
                />
              );
            }}
            error={errors?.description?.message}
          />
          <Button
            variant="outline-primary"
            type="submit"
            className="btn-minwidth-sm"
          >
            <span>SUBMIT</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactInfo;
