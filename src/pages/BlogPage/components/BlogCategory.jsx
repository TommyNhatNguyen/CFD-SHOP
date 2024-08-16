import React from "react";

const BlogCategory = () => {
  return (
    <div className="widget widget-cats">
      <h3 className="widget-title">Categories</h3>
      <ul>
        <li>
          <a href="#">
            Lifestyle <span>3</span>
          </a>
        </li>
        <li>
          <a href="#">
            Shopping <span>3</span>
          </a>
        </li>
        <li>
          <a href="#">
            Fashion <span>1</span>
          </a>
        </li>
        <li>
          <a href="#">
            Travel <span>3</span>
          </a>
        </li>
        <li>
          <a href="#">
            Hobbies <span>2</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BlogCategory;
