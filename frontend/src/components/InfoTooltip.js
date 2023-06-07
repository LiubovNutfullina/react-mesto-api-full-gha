import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  const popupIsOpened = `${isOpen ? "popup_is-opened" : ""}`;

  return (
    <section className={`popup ${popupIsOpened}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close_tooltip"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image-tooltip"
          src={isSuccess ? success : error}
        />
        <h2 className="popup__text">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
