import React from "react";

function ImagePopup(props) {
  const isOpen = `${props.isOpen ? "popup_is-opened" : ""}`;

  return (
    <section className={`popup popup_image popup_opacity ${isOpen} `}>
      <div className="popup__container popup__container_image popup__container_background-transparent">
        <button
          className="popup__close popup__close_image"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <div className="popup__content popup__content_image">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <h3 className="popup__title-image">{props.card.name}</h3>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
