import React from "react";

const BlogPopular = () => {
  return (
    <div className="widget">
      <h3 className="widget-title">Popular Posts</h3>
      <ul className="posts-list">
        <li>
          <figure>
            <a href="#">
              <img src="assets/images/blog/sidebar/post-1.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 22, 2018</span>
            <h4>
              <a href="#">Aliquam tincidunt mauris eurisus.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="assets/images/blog/sidebar/post-2.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 19, 2018</span>
            <h4>
              <a href="#">Cras ornare tristique elit.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="assets/images/blog/sidebar/post-3.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 12, 2018</span>
            <h4>
              <a href="#">Vivamus vestibulum ntulla nec ante.</a>
            </h4>
          </div>
        </li>
        <li>
          <figure>
            <a href="#">
              <img src="assets/images/blog/sidebar/post-4.jpg" alt="post" />
            </a>
          </figure>
          <div>
            <span>Nov 25, 2018</span>
            <h4>
              <a href="#">Donec quis dui at dolor tempor interdum.</a>
            </h4>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BlogPopular;
