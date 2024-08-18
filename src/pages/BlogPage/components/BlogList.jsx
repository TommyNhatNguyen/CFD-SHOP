import { Skeleton, Empty } from "antd";
import React, { useEffect } from "react";
import { FullSizeSkeleton } from "../../../components/StyledComponents";
import PATHS from "../../../constants/paths";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Pagination from "../../../components/Pagination";
import { formatDate } from "../../../utils/format";

const BlogItemWrapper = styled.div`
  .entry-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    div {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 85px;
    }
    .read-more {
      margin-top: 1.3rem;
    }
  }
`;

const BlogList = ({ blogs, loading, pagiProps, selectedTag }) => {
  let renderBlogs;
  if (selectedTag?.length > 0) {
    renderBlogs = blogs?.filter((item) =>
      item?.tags?.some((tag) => selectedTag?.includes(tag))
    );
  } else {
    renderBlogs = blogs;
  }
  if (loading) {
    return (
      <div className="col-lg-9">
        <div className="entry-container max-col-2" data-layout="fitRows">
          {Array(6)
            .fill("")
            .map((_, index) => {
              return (
                <div key={index} className="entry-item col-sm-6">
                  <div className="entry entry-grid">
                    <FullSizeSkeleton
                      style={{ height: "240px", marginBottom: "1.4rem" }}
                    >
                      <Skeleton.Image active />
                    </FullSizeSkeleton>
                    <Skeleton.Input style={{ marginBottom: "1.4rem" }} />
                    <Skeleton.Input block />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-lg-9">
        {!loading && renderBlogs?.length > 0 ? (
          <>
            <div className="entry-container max-col-2" data-layout="fitRows">
              {!loading &&
                renderBlogs?.length > 0 &&
                renderBlogs?.map((item, index) => {
                  const {
                    id,
                    createdAt,
                    author,
                    description,
                    image,
                    name,
                    slug,
                  } = item;
                  const blogPath = `${PATHS.BLOG.INDEX}/${slug || ""}`;
                  return (
                    <BlogItemWrapper
                      key={id || index}
                      className="entry-item col-sm-6"
                    >
                      <article className="entry entry-grid">
                        <figure className="entry-media">
                          <Link to={blogPath || ""}>
                            <img src={image || ""} alt="image desc" />
                          </Link>
                        </figure>
                        <div className="entry-body">
                          <div className="entry-meta">
                            <span>{formatDate(createdAt)}</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                              by <a href="#">{author || ""}</a>
                            </span>
                          </div>
                          <h2 className="entry-title">
                            <Link to={blogPath || ""}>{name || ""}</Link>
                          </h2>
                          <div className="entry-content">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: description || "",
                              }}
                            ></div>
                            <Link to={blogPath || ""} className="read-more">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </article>
                    </BlogItemWrapper>
                  );
                })}
            </div>
            {selectedTag?.length < 1 && <Pagination {...pagiProps} />}
          </>
        ) : (
          <Empty description="No blogs found" />
        )}
      </div>
    );
  }
};

export default BlogList;
