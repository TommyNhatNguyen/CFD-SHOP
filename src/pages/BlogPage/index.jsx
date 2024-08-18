import React from "react";
import PATHS from "../../constants/paths";
import BreadCrumb from "../../components/BreadCrumb";
import BlogList from "./components/BlogList";
import BlogSearch from "../../components/BlogSearch";
import BlogCategory from "../../components/BlogCategory";
import BlogPopular from "../../components/BlogPopular";
import BlogAdBanner from "../../components/BlogAdBanner";
import BlogTag from "../../components/BlogTag";
import useBlog from "../../hooks/useBlog";

const BlogPage = () => {
  const {
    blogListProps,
    blogCategoryProps,
    blogTagProps,
    blogPopularProps,
    blogSearchProps,
  } = useBlog();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("/assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Blog</h1>
        </div>
      </div>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item isActive>Blog</BreadCrumb.Item>
      </BreadCrumb>
      <div className="page-content">
        <div className="container">
          <div className="row">
            <BlogList {...blogListProps} />
            <aside className="col-lg-3">
              <div className="sidebar">
                <BlogSearch {...blogSearchProps} />
                <BlogCategory {...blogCategoryProps} />
                <BlogPopular {...blogPopularProps} />
                <BlogAdBanner />
                <BlogTag {...blogTagProps} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
