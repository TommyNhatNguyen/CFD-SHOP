import { Link } from "react-router-dom";
import { PopularPostWrapper } from "../components/StyledComponents";
import { formatDate } from "./format";

export const renderProductDropDown = (name, images, productPath) => {
  let imgPath = images?.[0];
  if (imgPath?.split("https")?.length > 2) {
    imgPath = imgPath?.split("https");
    imgPath = "https" + imgPath?.slice(-1);
  }
  return {
    value: [name, productPath],
    label: (
      <ul className="posts-list">
        <PopularPostWrapper>
          <figure style={{ maxWidth: 50 }}>
            <Link to={productPath || ""}>
              <img src={imgPath || ""} alt="post" />
            </Link>
          </figure>
          <div>
            <h4>
              <Link to={productPath || ""}>{name || ""}</Link>
            </h4>
          </div>
        </PopularPostWrapper>
      </ul>
    ),
  };
};

export const renderBlogDropDown = (name, image, blogPath, createdAt) => ({
  value: [name, blogPath],
  label: (
    <ul className="posts-list">
      <PopularPostWrapper>
        <figure>
          <Link to={blogPath || ""}>
            <img src={image || ""} alt="post" />
          </Link>
        </figure>
        <div>
          <span>{formatDate(createdAt || "")}</span>
          <h4>
            <Link to={blogPath || ""}>{name || ""}</Link>
          </h4>
        </div>
      </PopularPostWrapper>
    </ul>
  ),
});
