import queryString from "query-string";
import useMutation from "./useMutation";
import { blogService } from "../services/blogService";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import useQuery from "./useQuery";
import { formatDate } from "../utils/format";
import PATHS from "../constants/paths";
import { PopularPostWrapper } from "../components/StyledComponents";
import { message } from "antd";
import { scrollTop } from "../utils/scrollTop";
import { useSelector } from "react-redux";
import { renderBlogDropDown } from "../utils/renderDropDown";

function useBlog() {
  const BLOG_LIMITS = 6;
  const { blogSlug } = useParams();
  const { state } = useLocation();
  const [selectedTag, setSelectedTag] = useState([]);
  const [isFilterTag, setIsFilterTag] = useState(false);
  const { profile } = useSelector((state) => state.auth);

  const {
    data: blogData,
    loading: blogLoading,
    execute: fetchBlog,
  } = useMutation((query) =>
    blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`)
  );
  const { data: blogCategoryData } = useQuery(blogService.getBlogCategories);
  const { data: blogTagData } = useQuery(blogService.getBlogTags);
  const { data: blogsAllData } = useQuery(blogService.getBlogs);
  const { data: blogDetailData, execute: fetchBlogDetail } = useMutation(
    (slug) => blogService.getBlogsBySlug(`/${slug}`)
  );

  const blogs = blogData?.blogs || [];
  const blogsPagi = blogData?.pagination || [];
  const blogCategories = blogCategoryData?.blogs || [];
  const blogTags = blogTagData?.blogs || [];
  const blogsAll = blogsAllData?.blogs || [];
  const blogDetail = blogDetailData || {};

  const [_, setSearchParams] = useSearchParams();
  const { search } = useLocation();
  let queryObject = queryString.parse(search);
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: BLOG_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

  useEffect(() => {
    fetchBlog(search);
    setSelectedTag([]);
  }, [search]);

  useEffect(() => {
    function layoutInit(container, selector) {
      $(container).each(function () {
        var $this = $(this);

        $this.isotope({
          itemSelector: selector,
          layoutMode: $this.data("layout") ? $this.data("layout") : "masonry",
        });
      });
    }

    function isotopeFilter(filterNav, container) {
      $(filterNav)
        .find("a")
        .on("click", function (e) {
          var $this = $(this),
            filter = $this.attr("data-filter");

          // Remove active class
          $(filterNav).find(".active").removeClass("active");

          // Init filter
          $(container).isotope({
            filter: filter,
            transitionDuration: "0.7s",
          });

          // Add active class
          $this.closest("li").addClass("active");
          e.preventDefault();
        });
    }
    if (blogs?.length > 0 && blogsPagi && !blogLoading) {
      if (typeof imagesLoaded === "function" && $.fn.isotope) {
        $(".entry-container").imagesLoaded(function () {
          // Blog Grid/Masonry
          layoutInit(".entry-container", ".entry-item"); // container - selector
          // Blog Filter
          isotopeFilter(".entry-filter", ".entry-container"); //filterNav - .container
        });
      }
    }
  }, []);

  useEffect(() => {
    if (blogSlug) {
      fetchBlogDetail(blogSlug);
    }
  }, [blogSlug]);

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(blogsPagi?.page || queryObject?.page || 1),
    limit: Number(blogsPagi?.limit || 0),
    total: Number(blogsPagi?.total || 0),
    onPagiChange,
  };

  const handleUpdateFilterTag = () => {
    setIsFilterTag((prev) => !prev);
    scrollTop();
  };
  useEffect(() => {
    if (state?.selectedTag) {
      if (!selectedTag?.includes(state?.selectedTag)) {
        setSelectedTag((prev) => [...prev, state?.selectedTag]);
      } else {
        setSelectedTag((prev) => [
          ...prev.filter((item) => item !== state?.selectedTag),
        ]);
      }
    }
  }, [state?.selectedTag, isFilterTag]);

  const options = [
    {
      label: "Find your blog",
      options: blogsAll?.map((blog) => {
        const { name, slug, image, createdAt } = blog || {};
        const blogPath = `${PATHS.BLOG.INDEX}/${slug || ""}`;
        return renderBlogDropDown(name, image, blogPath, createdAt);
      }),
    },
  ];

  const handleReplyComment = (e) => {
    e.preventDefault();
    message.warning("Feature not supported yet!");
  };

  const handlePostComment = (data) => {
    if (data) {
      message.success("Comment posted successful");
    }
  };
  /**-------------- */
  const blogListProps = {
    blogs,
    loading: blogLoading,
    pagiProps,
    selectedTag,
  };
  const blogCategoryProps = {
    blogCategories,
    blogsAll,
  };
  const blogTagProps = {
    blogDetail,
    blogTags,
    selectedTag,
    handleUpdateFilterTag,
  };
  const blogPopularProps = {
    blogsPopular: blogsAll?.filter((blog) => blog.isPopular),
  };
  const blogSearchProps = {
    blogsAll,
    options,
  };
  const blogDetailProps = {
    blogDetail,
    blogTags,
    blogsAll,
    handleReplyComment,
    handlePostComment,
    profile,
  };
  const blogDetailBreadCrumProps = { blogName: blogDetail?.name || "" };
  return {
    blogListProps,
    blogCategoryProps,
    blogTagProps,
    blogPopularProps,
    blogSearchProps,
    blogDetailProps,
    blogDetailBreadCrumProps,
  };
}
export default useBlog;
