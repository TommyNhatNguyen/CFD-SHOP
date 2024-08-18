import React, { useCallback, useEffect, useState } from "react";
import useBlog from "../../hooks/useBlog";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import BlogSearch from "../../components/BlogSearch";
import BlogCategory from "../../components/BlogCategory";
import BlogPopular from "../../components/BlogPopular";
import BlogAdBanner from "../../components/BlogAdBanner";
import BlogTag from "../../components/BlogTag";
import BlogDetailContent from "./components/BlogDetailContent";
import { useNavigate, useParams } from "react-router-dom";
import { owlCarousels } from "../../utils/owlCarousels";

const BlogDetailPage = () => {
  const {
    blogCategoryProps,
    blogTagProps,
    blogPopularProps,
    blogSearchProps,
    blogDetailProps,
    blogDetailBreadCrumProps,
  } = useBlog();

  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item link={PATHS.BLOG.INDEX}>Blog</BreadCrumb.Item>
        <BreadCrumb.Item isActive>
          {blogDetailBreadCrumProps.blogName}
        </BreadCrumb.Item>
      </BreadCrumb>

      <div className="page-content">
        <div className="container">
          <div className="row">
            <BlogDetailContent {...blogDetailProps} />
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

export default BlogDetailPage;
