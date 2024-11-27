import React from "react";
import logoPath from "../../images/logo.svg";
import Auth from "auth/Auth";

function Header({ setAuthInfo }) {
  return (
    <header className="header page__section">
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="logo header__logo"
      />
      <Auth setAuthInfo={setAuthInfo} />
    </header>
  );
}

export default Header;
