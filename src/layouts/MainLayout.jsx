import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MobileMenuOverlay from "../components/MobileMenuOverlay";
import MobileMenuContainer from "../components/MobileMenuContainer";
import Modal from "../components/Modal";
import Button from "../components/Button";
import { createPortal } from "react-dom";
import ModalBackDrop from "../components/ModalBackDrop";
import { MainContextProvider } from "../context/MainContext";
import ScrollTop from "../components/ScrollTop";

const MainLayout = () => {
  return (
    <MainContextProvider>
      {/* <AuthContextProvider> */}
      <div className="page-wrapper">
        <Header />
        <Outlet />
        <Footer />
      </div>
      {createPortal(
        <>
          <ScrollTop />
          <MobileMenuOverlay />
          <MobileMenuContainer />
          <Modal />
        </>,
        document.body
      )}
      {/* </AuthContextProvider> */}
    </MainContextProvider>
  );
};

export default MainLayout;
