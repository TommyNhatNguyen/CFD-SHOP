import React from "react";

const ContactHero = () => {
  return (
    <div className="container">
      <div
        className="page-header page-header-big text-center"
        style={{
          backgroundImage: 'url("/assets/images/contact-header-bg.jpg")',
        }}
      >
        <h1 className="page-title text-white">
          Contact us <span className="text-white">keep in touch with us</span>
        </h1>
      </div>
    </div>
  );
};

export default ContactHero;
