import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(inputRef.current.value);
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="input">
        <input
          ref={inputRef}
          type="url"
          id="link"
          className="input__text  input__text_type_link"
          placeholder="Ссылка на картинку"
        />
        <span className="link-error input__text-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
