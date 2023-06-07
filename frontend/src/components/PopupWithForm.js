import React from "react";

function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  const isOpenPopup = `${isOpen ? "popup_is-opened" : ""}`;

  return (
    <section className={`popup popup_${name} ${isOpenPopup}`}>
      <div className="popup__container">
        <button
          className="popup__close popup__close_delete"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <form className="popup__content" onSubmit={onSubmit} name={`${name}`}>
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
          type="submit"
          className="popup__button-submit"
        >
          {buttonText}
        </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
