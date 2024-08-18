import React from "react";
import PATHS from "../../constants/paths";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/format";
import styled from "styled-components";

const BLOGS_LIMIT = 4;
const PopularPostWrapper = styled.li`
  display: flex;
  align-items: flex-start;
  figure {
    max-width: 100px;
  }
  div {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const BlogPopular = ({ blogsPopular }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <ul className="posts-list">
        {blogsPopular?.slice(0, BLOGS_LIMIT)?.map((blog, index) => {
          const { id, createdAt, image, name, slug, tags } = blog;
          const blogPath = `${PATHS.BLOG.INDEX}/${slug || ""}`;
          return (
            <PopularPostWrapper key={id || index}>
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
          );
        })}
      </ul>
    </div>
  );
};

export default BlogPopular;
