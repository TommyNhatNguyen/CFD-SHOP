import moment from "moment";
import React from "react";
import styled from "styled-components";

const ReviewContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewItem = ({
  userName = "User",
  id,
  rate = 0,
  createdAt,
  title,
  description,
}) => {
  const createdDays = moment.duration(moment().diff(createdAt)).days();
  return (
    <div className="review">
      <div className="row no-gutters">
        <div className="col-auto">
          <h4>
            <a href="#">
              {userName} {userName === "User" && id.substring(-1, 6)}
            </a>
          </h4>
          <div className="ratings-container">
            <div className="ratings">
              <div
                className="ratings-val"
                style={{ width: `${(rate * 100) / 5}%` }}
              />
            </div>
          </div>
          <span className="review-date">{createdDays} days ago</span>
        </div>
        {!!!title && !!!description ? (
          <p>No review</p>
        ) : (
          <ReviewContentWrapper className="col">
            <h4>{title || ""}</h4>
            <div className="review-content">
              <p>{description || ""}</p>
            </div>
            <div className="review-action">
              <a href="#">
                <i className="icon-thumbs-up" />
                Helpful (0)
              </a>
              <a href="#">
                <i className="icon-thumbs-down" />
                Unhelpful (0)
              </a>
            </div>
          </ReviewContentWrapper>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
