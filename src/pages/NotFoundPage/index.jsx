import React from "react";
import Button from "../../components/Button";
import PATHS from "../../constants/paths";

const NotFoundPage = () => {
  return (
    <main className="main">
      <div
        className="error-content text-center"
        style={{
          backgroundImage: "url(/assets/images/backgrounds/error-bg.jpg)",
        }}
      >
        <div className="container">
          <h1 className="error-title">Error 404</h1>
          <p>We are sorry, the page you've requested is not available.</p>
          <Button link={PATHS.HOME} className=" btn-minwidth-lg">
            <span>BACK TO HOMEPAGE</span>
            <i className="icon-long-arrow-right" />
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
