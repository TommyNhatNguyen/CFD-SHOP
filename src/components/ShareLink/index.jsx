import React from "react";

const ShareLink = ({ children, title, ...props }) => {
  return (
    <a className="social-icon" title={title} target="_blank" {...props}>
      {children}
    </a>
  );
};

export default ShareLink;
