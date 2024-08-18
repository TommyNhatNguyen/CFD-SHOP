import { Empty } from "antd";
import classNames from "classnames";
import React, { useEffect } from "react";
import styled from "styled-components";

const TagWrapper = styled.a`
  cursor: pointer;
  &.active {
    color: #fcb941 !important;
    background-color: #fff !important;
  }
`;

const BlogTag = ({ blogTags, handleSelectTag, selectedTag, blogDetail }) => {
  const _onSelectTag = (e, tag) => {
    e?.preventDefault();
    handleSelectTag?.(tag);
  };
  useEffect(() => {
    if (Object.keys(blogDetail)?.length > 0) {
      handleSelectTag?.(blogDetail?.tags, true);
    }
  }, [blogDetail]);

  return (
    <div className="widget">
      <h3 className="widget-title">Browse Tags</h3>
      <div className="tagcloud">
        {blogTags?.length > 0 ? (
          blogTags?.map((tag, index) => {
            const { id, name } = tag || {};
            return (
              <TagWrapper
                key={id || index}
                className={classNames({ active: selectedTag?.includes(id) })}
                onClick={(e) => _onSelectTag(e, id)}
              >
                {name || ""}
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
