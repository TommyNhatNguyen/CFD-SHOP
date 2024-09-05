import React, { useEffect, useMemo, useState } from "react";
import { formatDate } from "../../../utils/format";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import PATHS from "../../../constants/paths";
import ComponentLoading from "../../../components/ComponentLoading";
import ShareLink from "../../../components/ShareLink";
import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import { useForm } from "react-hook-form";
import InputUseForm from "../../../components/InputUseForm";
import { MESSAGE } from "../../../constants/message";
import { REGEX } from "../../../utils/regex";
import { Skeleton } from "antd";
import {
  FullSizeSkeleton,
  ReplyFormWrapper,
} from "../../../components/StyledComponents";
import { MODAL } from "../../../constants/modal";
import { tokenMethod } from "../../../utils/tokenMethod";
import { useDispatch } from "react-redux";
import { handleShowModal } from "../../../store/reducer/authReducer";

const BlogDetailContent = ({
  blogDetail,
  blogTags,
  blogsAll,
  handleReplyComment,
  handlePostComment,
  profile,
}) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [_, setForceUpdate] = useState({});
  const { image, name, createdAt, author, description, tags, id } = blogDetail;
  const url = window.location.href;
  const relatedBlogs = useMemo(
    () =>
      blogsAll?.filter(
        (item) =>
          item?.tags?.some((tag) => tags?.includes(tag)) && item?.id !== id
      ),
    [blogsAll, id, tags]
  );
  const modTags = blogTags?.filter((tag) => tags?.includes(tag?.id));
  const currentBlogIndex = useMemo(() => {
    return blogsAll?.findIndex((item) => item?.id === id);
  }, [blogsAll, blogDetail]);
  const prevBlog =
    currentBlogIndex - 1 >= 0 ? blogsAll?.[currentBlogIndex - 1] : "";
  const nextBlog =
    currentBlogIndex + 1 < blogsAll?.length
      ? blogsAll?.[currentBlogIndex + 1]
      : "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const _onPostComment = (data) => {
    if (data) {
      handlePostComment(data);
      reset();
    }
  };
  const _onShowModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(handleShowModal(MODAL.login));
  };

  useEffect(() => {
    if (tokenMethod.get()) {
      setIsLogin(true);
    }
  }, [profile]);

  useEffect(() => {
    setForceUpdate({});
  }, [relatedBlogs]);

  return (
    <div className="col-lg-9">
      {Object.keys(blogDetail)?.length > 1 ? (
        <article className="entry single-entry">
          <div className="entry-body">
            <figure className="entry-media">
              <img src={image || ""} alt="image desc" />
            </figure>
            <h1 className="entry-title entry-title-big">{name || ""}</h1>
            <div className="entry-meta">
              <span>{formatDate(createdAt || "")}</span>
              <span className="meta-separator">|</span>
              <span className="entry-author">
                by <a href="#">{author || ""}</a>
              </span>
            </div>
            <div
              className="entry-content editor-content"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            ></div>
            <div className="entry-footer row no-gutters flex-column flex-md-row">
              <div className="col-md">
                <div className="entry-tags">
                  <span>Tags:</span>
                  {modTags?.map((tag, index) => {
                    const { name, id } = tag;
                    return (
                      <a
                        key={id || index}
                        href="#"
                        style={{ pointerEvents: "none" }}
                      >
                        {name || ""}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-auto mt-2 mt-md-0">
                <div className="social-icons social-icons-color">
                  <span className="social-label">Share this post:</span>
                  <ShareLink title="Facebook">
                    <FacebookShareButton url={url}>
                      <span className="social-icon social-facebook">
                        <i className="icon-facebook-f" />
                      </span>
                    </FacebookShareButton>
                  </ShareLink>
                  <ShareLink title="Twitter">
                    <TwitterShareButton url={url}>
                      <span className="social-icon social-twitter">
                        <i className="icon-twitter" />
                      </span>
                    </TwitterShareButton>
                  </ShareLink>
                  <ShareLink title="Pinterest">
                    <PinterestShareButton url={url} media={url}>
                      <span className="social-icon social-pinterest">
                        <i className="icon-pinterest" />
                      </span>
                    </PinterestShareButton>
                  </ShareLink>
                  <ShareLink title="Pinterest">
                    <LinkedinShareButton url={url} media={url}>
                      <span className="social-icon social-linkedin">
                        <i className="icon-linkedin" />
                      </span>
                    </LinkedinShareButton>
                  </ShareLink>
                </div>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <article className="entry single-entry" style={{ minHeight: 950 }}>
          <div className="entry-body">
            <FullSizeSkeleton style={{ height: 600 }}>
              <Skeleton.Image active />
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
              <div>
                <br />
                <Skeleton.Input block active />
              </div>
            </FullSizeSkeleton>
          </div>
        </article>
      )}
      <nav className="pager-nav" aria-label="Page navigation">
        <Link
          className="pager-link pager-link-prev"
          to={`${PATHS.BLOG.INDEX}/${prevBlog?.slug || ""}`}
          style={{
            pointerEvents: !prevBlog ? "none" : "all",
            color: !prevBlog ? "#777" : "#fcb941",
          }}
        >
          {prevBlog ? "Previous Post" : "Last post"}
          <span className="pager-link-title">{prevBlog?.name || ""}</span>
        </Link>
        <Link
          className="pager-link pager-link-next"
          to={`${PATHS.BLOG.INDEX}/${nextBlog?.slug || ""}`}
          style={{
            pointerEvents: !nextBlog ? "none" : "all",
            color: !nextBlog ? "#777" : "#fcb941",
          }}
        >
          {nextBlog ? "Next Post" : "Last post"}
          <span className="pager-link-title">{nextBlog?.name || ""}</span>
        </Link>
      </nav>
      <div className="related-posts">
        <h3 className="title">Related Posts</h3>
        {relatedBlogs?.length === 0 && (
          <div style={{ height: "348px", position: "relative" }}>
            <ComponentLoading />
          </div>
        )}
        {relatedBlogs?.length > 0 && (
          <OwlCarousel
            className="owl-carousel owl-simple"
            nav={false}
            dots={true}
            margin={20}
            loop={false}
            responsive={{
              0: {
                items: 1,
              },
              480: {
                items: 2,
              },
              768: {
                items: 3,
              },
            }}
          >
            {relatedBlogs?.length > 0 &&
              relatedBlogs?.map((blog, index) => {
                const { id, createdAt, author, image, name, slug } = blog || {};
                const blogPath = `${PATHS.BLOG.INDEX}/${slug || ""}`;
                return (
                  <article key={id || index} className="entry entry-grid">
                    <figure className="entry-media">
                      <Link to={blogPath}>
                        <img src={image || ""} alt="image desc" />
                      </Link>
                    </figure>
                    <div className="entry-body">
                      <div className="entry-meta">
                        <span>{formatDate(createdAt || "")}</span>
                        <span className="meta-separator">|</span>
                        <span className="entry-author">
                          by <a>{author || ""}</a>
                        </span>
                      </div>
                      <h2 className="entry-title">
                        <Link to={blogPath}>{name || ""}</Link>
                      </h2>
                    </div>
                  </article>
                );
              })}
          </OwlCarousel>
        )}
      </div>
      <div className="comments">
        <h3 className="title">3 Comments</h3>
        <ul>
          <li>
            <div className="comment">
              <figure className="comment-media">
                <a href="#">
                  <img
                    src="/assets/images/blog/comments/1.jpg"
                    alt="User name"
                  />
                </a>
              </figure>
              <div className="comment-body">
                <a
                  href="#"
                  className="comment-reply"
                  onClick={handleReplyComment}
                >
                  Reply
                </a>
                <div className="comment-user">
                  <h4>
                    <a href="#">Jimmy Pearson</a>
                  </h4>
                  <span className="comment-date">
                    November 9, 2018 at 2:19 pm
                  </span>
                </div>
                <div className="comment-content">
                  <p>
                    Sed pretium, ligula sollicitudin laoreet viverra, tortor
                    libero sodales leo, eget blandit nunc tortor eu nibh. Nullam
                    mollis. Ut justo. Suspendisse potenti.
                  </p>
                </div>
              </div>
            </div>
            <ul>
              <li>
                <div className="comment">
                  <figure className="comment-media">
                    <a href="#">
                      <img
                        src="/assets/images/blog/comments/2.jpg"
                        alt="User name"
                      />
                    </a>
                  </figure>
                  <div className="comment-body">
                    <a
                      href="#"
                      className="comment-reply"
                      onClick={handleReplyComment}
                    >
                      Reply
                    </a>
                    <div className="comment-user">
                      <h4>
                        <a href="#">Lena Knight</a>
                      </h4>
                      <span className="comment-date">
                        November 9, 2018 at 2:19 pm
                      </span>
                    </div>
                    <div className="comment-content">
                      <p>Morbi interdum mollis sapien. Sed ac risus.</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="comment">
              <figure className="comment-media">
                <a href="#">
                  <img
                    src="/assets/images/blog/comments/3.jpg"
                    alt="User name"
                  />
                </a>
              </figure>
              <div className="comment-body">
                <a
                  href="#"
                  className="comment-reply"
                  onClick={handleReplyComment}
                >
                  Reply
                </a>
                <div className="comment-user">
                  <h4>
                    <a href="#">Johnathan Castillo</a>
                  </h4>
                  <span className="comment-date">
                    November 9, 2018 at 2:19 pm
                  </span>
                </div>
                <div className="comment-content">
                  <p>
                    Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                    euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus
                    pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <ReplyFormWrapper className="reply">
        <div className="heading">
          <h3 className="title">Leave A Reply</h3>
          <p className="title-desc">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>
        <form onSubmit={handleSubmit(_onPostComment)}>
          <InputUseForm
            label="Comment"
            labelClassName="sr-only"
            required
            error={errors?.comment?.message}
            renderInput={(inputProps) => {
              return (
                <textarea
                  {...inputProps}
                  name="reply-message"
                  id="reply-message"
                  cols={30}
                  rows={4}
                  className="form-control"
                  placeholder="Comment *"
                  {...register("comment", { required: MESSAGE.required })}
                />
              );
            }}
          />
          <div className="row">
            <div className="col-md-6">
              <InputUseForm
                label="Name"
                labelClassName="sr-only"
                required
                placeholder="Name *"
                {...register("name", { required: MESSAGE.required })}
                error={errors?.name?.message}
              />
            </div>
            <div className="col-md-6">
              <InputUseForm
                label="Email"
                labelClassName="sr-only"
                required
                placeholder="Email *"
                {...register("email", {
                  required: MESSAGE.required,
                  pattern: { value: REGEX.email, message: MESSAGE.email },
                })}
                error={errors?.email?.message}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary-2">
            <span>POST COMMENT</span>
            <i className="icon-long-arrow-right" />
          </button>
        </form>
        {!isLogin && (
          <div className="reply__login">
            <p>
              Please{" "}
              <a
                href="#"
                className="top-menu-login"
                id={MODAL.login}
                onClick={_onShowModal}
              >
                Login | Resgister
              </a>{" "}
              to leave a reply
            </p>
          </div>
        )}
      </ReplyFormWrapper>
    </div>
  );
};

export default BlogDetailContent;
