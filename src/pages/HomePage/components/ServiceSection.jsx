import React from "react";

const ICONS = [
  "icon-rocket",
  "icon-rotate-left",
  "icon-info-circle",
  "icon-life-ring",
];
const ServiceSection = ({ services }) => {
  return (
    <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
      <div className="container">
        <div className="row">
          {Object.values(services || {})?.map((service, index) => {
            return (
              <div key={service?.id || index} className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className={ICONS?.[index]} />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">{service?.title || ""}</h3>
                    <p>{service?.description || ""}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
