import queryString from "query-string";
import useMutation from "../../hooks/useMutation";
import { blogService } from "../../services/blogService";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function useBlog() {
  const BLOG_LIMITS = 6;
  /** Blog list */
  const {
    data: blogData,
    loading: blogLoading,
    execute: fetchBlog,
  } = useMutation((query) =>
    blogService.getBlogs(query || `?limit=${BLOG_LIMITS}`)
  );
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
  const blogs = blogData?.blogs || [];
  const blogsPagi = blogData?.pagination || [];
  useEffect(() => {
    fetchBlog(search);
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

  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };
  const pagiProps = {
    page: Number(blogsPagi?.page || queryObject?.page || 1),
    limit: Number(blogsPagi?.limit || 0),
    total: Number(blogsPagi?.total || 0),
    onPagiChange,
  };

  const blogListProps = {
    blogs,
    loading: blogLoading,
    pagiProps,
  };
  /**-------------- */
  return { blogListProps };
}
export default useBlog;
