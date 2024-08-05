import React from "react";
import HeaderTop from "./components/HeaderTop";
import HeaderMiddle from "./components/HeaderMiddle";

const Header = () => {
  return (
    <header className="header">
      <HeaderTop />
      <HeaderMiddle />
    </header>
  );
};

export default Header;
