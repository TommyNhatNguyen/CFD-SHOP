import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import PATHS from "../../constants/paths";
import ContactHero from "./components/ContactHero";
import ContactInfo from "./components/ContactInfo";
import ContactStore from "./components/ContactStore";
import ContactMap from "./components/ContactMap";

const ContactPage = () => {
  return (
    <main className="main">
      <BreadCrumb>
        <BreadCrumb.Item link={PATHS.HOME}>Home</BreadCrumb.Item>
        <BreadCrumb.Item isActive>Contact us</BreadCrumb.Item>
      </BreadCrumb>
      <ContactHero />
      <div className="page-content pb-0">
        <div className="container">
          <ContactInfo />
          <hr className="mt-4 mb-5" />
          <ContactStore />
        </div>
        <ContactMap />
      </div>
    </main>
  );
};

export default ContactPage;
