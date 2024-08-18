import React from "react";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";

const AboutPage = () => {
  const { data: aboutPageData } = useQuery(() =>
    pageService.getPagesByName("/about us")
  );
  const aboutPage = aboutPageData?.data || {};

  return (
    <main className="main" style={{ position: "relative" }}>
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item isActive>About us</BreadCrumb.Item>
      </BreadCrumb>
      <div className="container">
        <div
          className="page-header page-header-big text-center"
          style={{
            backgroundImage: `url(${aboutPage?.banner || ""})`,
          }}
        >
          <h1 className="page-title text-white">
            {aboutPageData?.title || ""}
            <span className="text-white">{aboutPageData?.subTitle || ""}</span>
          </h1>
        </div>
      </div>
      <div className="page-content pb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-3 mb-lg-0">
              <h2 className="title">{aboutPage?.title1 || ""}</h2>
              <p>{aboutPage?.description1 || ""}</p>
            </div>
            <div className="col-lg-6">
              <h2 className="title">{aboutPage?.title2 || ""}</h2>
              <p>{aboutPage?.description2 || ""}</p>
            </div>
          </div>
          <div className="mb-5" />
        </div>
        <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 mb-3 mb-lg-0">
                <h2 className="title">{aboutPage?.title3 || ""}</h2>
                <p className="lead text-primary mb-3">
                  {aboutPage?.description3 || ""}
                </p>
                <p className="mb-2">{aboutPage?.description3 || ""}</p>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="about-images">
                  <img
                    src={aboutPage?.image1 || ""}
                    alt="about image"
                    className="about-img-front"
                  />
                  <img
                    src={aboutPage?.image2 || ""}
                    alt="about image"
                    className="about-img-back"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="brands-text">
                <h2 className="title">{aboutPage?.titleBrand || ""}</h2>
                <p>{aboutPage?.descriptionBrand || ""}</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="brands-display">
                <div className="row justify-content-center">
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/1.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/2.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/3.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/4.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/5.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/6.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/7.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/8.png" alt="Brand Name" />
                    </a>
                  </div>
                  <div className="col-6 col-sm-4">
                    <a href="#" className="brand">
                      <img src="/assets/images/brands/9.png" alt="Brand Name" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2" />
      </div>
    </main>
  );
};

export default AboutPage;
