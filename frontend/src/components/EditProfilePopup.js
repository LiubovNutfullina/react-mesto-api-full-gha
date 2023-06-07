import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name ?? "");
    setDescription(currentUser.about ?? "");
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        id="username"
        className="name"
        placeholder="Имя"
        value={name}
        onChange={handleNameChange}
        min={"2"}
        max={"40"}
      />
      <Input
        type="text"
        id="working"
        className="job"
        placeholder="О себе"
        value={description}
        onChange={handleDescriptionChange}
        min={"2"}
        max={"200"}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
