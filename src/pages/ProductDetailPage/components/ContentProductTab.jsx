import React from "react";

const ContentProductTab = ({ children }) => {
  return (
    <div
      className={"tab-pane fade show active"}
      id="product-desc-tab"
      role="tabpanel"
      aria-labelledby="product-desc-link"
    >
      <div className="product-desc-content">{children}</div>
    </div>
  );
};

export default ContentProductTab;
