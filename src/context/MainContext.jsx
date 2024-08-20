import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { scrollTop } from "../utils/scrollTop";

export const MainContext = createContext({});

export const MainContextProvider = ({ children }) => {
  const currentPath = useLocation().pathname;
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const handleShowMobileMenu = (e) => {
    setIsShowMobileMenu((prev) => !prev);
    document.body.classList.toggle("mmenu-active");
  };
  const handleCloseMobileMenu = (e) => {
    setIsShowMobileMenu(false);
    document.body.classList.remove("mmenu-active");
  };
  //   Scroll top
  useEffect(() => {
    handleCloseMobileMenu();
    scrollTop();
    // Show scroll top button
    var $scrollTop = $("#scroll-top");
    $(window).on("load scroll", function () {
      if ($(window).scrollTop() >= 400) {
        $scrollTop.addClass("show");
      } else {
        $scrollTop.removeClass("show");
      }
    });

    $scrollTop.on("click", function (e) {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        800
      );
      e.preventDefault();
    });
  }, [currentPath]);

  return (
    <MainContext.Provider
      value={{
        handleShowMobileMenu,
        handleCloseMobileMenu,
        isShowMobileMenu,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);
