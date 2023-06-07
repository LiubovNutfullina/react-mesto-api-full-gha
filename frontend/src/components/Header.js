import React from "react";
import logo from "../images/logo.svg";
import "../blocks/header/__logo/header__logo.css";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <div className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Здесь написано Mesto Russia"
      />
      <div className="header__content">
        {props.email && <a className="header__link">{props.email}</a>}
        <Link
          to={props.linkPath}
          className="header__button"
          onClick={props.onButtonClick}
        >
          {props.buttonText}
        </Link>
      </div>
    </div>
  );
}

export default Header;
