const ABOUT = "/about-us";
const BLOG = "/blog";
const CART = "/cart";
const CHECKOUT = "/checkout";
const CONTACT = "/contact-us";
const DASHBOARD = "/dashboard";
const FAQ = "/faq";
const PAYMENT = "/payment";
const PRIVACY = "/privacy";
const PRODUCT = "/product";
const RETURN = "/return";
const SHIPPING = "/shipping";
const HOME = "/";
const PATHS = {
  HOME: HOME,
  ABOUT: ABOUT,
  BLOG: {
    INDEX: BLOG,
    DETAIL: BLOG + "/:blogSlug",
  },
  CART: CART,
  CHECKOUT: {
    INDEX: CHECKOUT,
    SUCCESS: CHECKOUT + "-success" + "/:orderSlug",
  },
  CONTACT: CONTACT,
  DASHBOARD: {
    INDEX: DASHBOARD,
    DETAIL: DASHBOARD + "/account-detail",
    ORDERS: DASHBOARD + "/orders",
    ADRESSES: DASHBOARD + "/adresses",
    WISHLIST: DASHBOARD + "/wishlist",
    CHANGEPASSWORD: DASHBOARD + "/change-password",
  },
  FAQ: FAQ,
  PAYMENT: PAYMENT,
  PRIVACY: PRIVACY,
  PRODUCT: {
    INDEX: PRODUCT,
    DETAIL: PRODUCT + "/:productSlug",
  },
  RETURN: RETURN,
  SHIPPING: SHIPPING,
};

export default PATHS;
