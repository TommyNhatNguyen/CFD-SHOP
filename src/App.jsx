import React, { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import CheckOutSuccessPage from "./pages/CheckOutSuccessPage";
import ContactPage from "./pages/ContactPage";
import DashBoardPage from "./pages/DashboardPage";
import FaqPage from "./pages/FaqPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PaymentMethodsPage from "./pages/PaymentMethodsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductPage from "./pages/ProductPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PATHS from "./constants/paths";
import PrivacyRoute from "./components/PrivacyRoute";
import "./assets/styles.css";
import { useDispatch } from "react-redux";
import { tokenMethod } from "./utils/tokenMethod";
import { handleGetProfile } from "./store/reducer/authReducer";
import { message } from "antd";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    message.config({
      top: 80,
      duration: 3,
    });
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={PATHS.HOME}>
            <Route index element={<HomePage />} />
            <Route path={PATHS.ABOUT} element={<AboutPage />} />
            <Route path={PATHS.BLOG.INDEX}>
              <Route index element={<BlogPage />} />
              <Route path={PATHS.BLOG.DETAIL} element={<BlogDetailPage />} />
            </Route>
            <Route element={<PrivacyRoute />}>
              <Route path={PATHS.CHECKOUT.INDEX} element={<CheckOutPage />} />
              <Route
                path={PATHS.CHECKOUT.SUCCESS}
                element={<CheckOutSuccessPage />}
              />
              <Route path={PATHS.CART} element={<CartPage />} />
              <Route path={PATHS.DASHBOARD} element={<DashBoardPage />} />
            </Route>
            <Route path={PATHS.CONTACT} element={<ContactPage />} />
            <Route path={PATHS.FAQ} element={<FaqPage />} />
            <Route path={PATHS.PAYMENT} element={<PaymentMethodsPage />} />
            <Route path={PATHS.PRIVACY} element={<PrivacyPolicyPage />} />
            <Route path={PATHS.PRODUCT.INDEX}>
              <Route index element={<ProductPage />} />
              <Route
                path={PATHS.PRODUCT.DETAIL}
                element={<ProductDetailPage />}
              />
            </Route>
            <Route path={PATHS.RETURN} element={<ReturnsPage />} />
            <Route path={PATHS.SHIPPING} element={<ShippingPage />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
