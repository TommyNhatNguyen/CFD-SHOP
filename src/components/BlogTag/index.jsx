import { Empty } from "antd";
import classNames from "classnames";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PATHS from "../../constants/paths";

const TagWrapper = styled.div`
  a {
    cursor: pointer;
    &:focus {
      color: #777;
      background-color: #fafafa;
    }
    &.active {
      color: #fcb941 !important;
      background-color: #fff !important;
    }
  }
`;

const BlogTag = ({ blogTags, selectedTag, handleUpdateFilterTag }) => {
  return (
    <div className="widget">
      <h3 className="widget-title">Browse Tags</h3>
      <div className="tagcloud">
        {blogTags?.length > 0 ? (
          blogTags?.map((tag, index) => {
            const { id, name } = tag || {};
            return (
              <TagWrapper key={id || index}>
                <Link
                  className={classNames({ active: selectedTag?.includes(id) })}
                  to={PATHS.BLOG.INDEX}
                  state={{ selectedTag: id }}
                  onClick={handleUpdateFilterTag}
                >
                  {name || ""}
                </Link>
              </TagWrapper>
            );
          })
        ) : (
          <Empty description="Tags not found" />
        )}
      </div>
    </div>
  );
};

export default BlogTag;
