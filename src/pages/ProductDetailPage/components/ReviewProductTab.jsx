import React, { useEffect, useMemo, useState } from "react";
import ReviewItem from "../../../components/ReviewItem";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import InputUseForm from "../../../components/InputUseForm";
import { MESSAGE } from "../../../constants/message";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { MODAL } from "../../../constants/modal";
import { handleShowModal } from "../../../store/reducer/authReducer";
import { tokenMethod } from "../../../utils/tokenMethod";
import PATHS from "../../../constants/paths";
import { ReplyFormWrapper } from "../../../components/StyledComponents";

const ReviewsWrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
`;

const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  svg {
    stroke: #000;
    fill: transparent;
    cursor: pointer;
    transition: 0.3s;
    &.active {
      stroke: #df9e29;
      fill: #df9e29;
    }
  }
`;

const ReviewProductTab = ({ totalReview, reviews, handleReviewProduct }) => {
  const { state } = useLocation();
  const isReview = useMemo(() => {
    return reviews?.map((review) => review?.order)?.includes(state?.order);
  }, [reviews]);
  const dispatch = useDispatch();
  const MAX_RATING = 5;
  const { profile } = useSelector((state) => state.auth);
  const [activeRating, setActiveRating] = useState([0]);
  const [isLogin, setIsLogin] = useState(false);
  const _onSetRating = (ratingIndex) => {
    const rating = ratingIndex + 1;
    setActiveRating(
      Array(rating)
        .fill("")
        .map((_, index) => index)
    );
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const _onPostReview = (data) => {
    const rate = Number(activeRating?.slice(-1)?.[0]) + 1;
    const _payload = {
      order: state?.order,
      product: state?.product,
      title: data?.title,
      description: data?.description,
      rate: rate,
    };
    handleReviewProduct?.(_payload);
    reset();
  };

  const _onShowModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleShowModal(MODAL.login));
  };
  useEffect(() => {
    if (tokenMethod.get()) {
      setIsLogin(true);
    }
  }, [profile]);
  return (
    <>
      <ReviewsWrapper
        className={"tab-pane fade show active"}
        id="product-review-tab"
        role="tabpanel"
        aria-labelledby="product-review-link"
      >
        {totalReview === 0 ? (
          <h3
            style={{
              fontWeight: 400,
              fontSize: "1.6rem",
              letterSpacing: "-0.01em",
              marginBottom: "1.8rem",
            }}
          >
            No reviews
          </h3>
        ) : (
          <div className="reviews">
            {reviews?.map((review, index) => {
              return <ReviewItem key={review?.id || index} {...review} />;
            })}
          </div>
        )}
      </ReviewsWrapper>
      <ReplyFormWrapper className="reply">
        {state?.order && state?.product && !isReview ? (
          <>
            <div className="heading">
              <h3 className="title">Leave A Review</h3>
              <p className="title-desc">
                Your email address will not be published. Required fields are
                marked *
              </p>
            </div>
            <form className="form" onSubmit={handleSubmit(_onPostReview)}>
              <InputUseForm
                label="Title"
                required
                labelClassName="sr-only"
                placeholder="Title *"
                {...register("title", { required: MESSAGE.required })}
                error={errors?.title?.message}
              />
              <InputUseForm
                label="Description"
                required
                labelClassName="sr-only"
                renderInput={(inputProps, error, ref) => {
                  return (
                    <textarea
                      {...inputProps}
                      name="description"
                      id="reply-message"
                      cols={30}
                      rows={4}
                      className={classNames("form-control", {
                        "input-error": error,
                      })}
                      placeholder="Description *"
                      {...register("description", {
                        required: MESSAGE.required,
                      })}
                    />
                  );
                }}
                error={errors?.description?.message}
              />
              <div className="form-group ">
                <div className="row">
                  <div className="col-md-2">
                    <label>Product Quality *:</label>
                  </div>
                  <div className="col-md-6">
                    <StarWrapper className="wrapper">
                      {Array(MAX_RATING)
                        .fill("")
                        .map((_, index) => {
                          return (
                            <div
                              key={index}
                              id={index}
                              className="star-icon"
                              onClick={() => _onSetRating(index)}
                            >
                              <svg
                                className={classNames("", {
                                  active: activeRating?.includes(index),
                                })}
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z"
                                  strokeWidth={1}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          );
                        })}
                    </StarWrapper>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-outline-primary-2">
                <span>POST COMMENT</span>
                <i className="icon-long-arrow-right" />
              </button>
            </form>
          </>
        ) : !isReview ? (
          <div className="heading">
            Please go to <Link to={PATHS.DASHBOARD.ORDERS}>my orders</Link> to
            review this product
          </div>
        ) : (
          <p>You reviewed this product</p>
        )}
        {!isLogin && (
          <div className="reply__login">
            <p>
              Please{" "}
              <a
                href="#"
                className="top-menu-login"
                id={MODAL.login}
                onClick={_onShowModal}
              >
                Login | Resgister
              </a>{" "}
              to leave a review
            </p>
          </div>
        )}
      </ReplyFormWrapper>
    </>
  );
};

export default ReviewProductTab;
