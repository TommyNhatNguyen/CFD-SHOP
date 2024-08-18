import React from "react";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../constants/paths";

const BlogCategory = ({ blogCategories, blogsAll }) => {
  return (
    <div className="widget widget-cats">
      <h3 className="widget-title">Categories</h3>
      <ul>
        <li>
          <NavLink end to={`${PATHS.BLOG.INDEX}`}>
            All <span>{blogsAll?.length || 0}</span>
          </NavLink>
        </li>
        {blogCategories?.length > 0 &&
          blogCategories?.map((item, index) => {
            const { id, name } = item;
            const numBlogs = blogsAll?.filter(
              (blog) => blog?.category?.id === id
            )?.length;
            return (
              <li key={id || index}>
                <NavLink end to={`${PATHS.BLOG.INDEX}/?category=${id || ""}`}>
                  {name || ""} <span>{numBlogs || 0}</span>
                </NavLink>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default BlogCategory;
