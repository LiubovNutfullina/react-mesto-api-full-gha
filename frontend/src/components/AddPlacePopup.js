import React from "react";
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      title: title,
      link: link,
    });
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleClose() {
    props.onClose();
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        id="title"
        className="title"
        placeholder="Название"
        value={title}
        onChange={handleTitleChange}
        min={"2"}
        max={"30"}
      />
      <Input
        type="url"
        id="url"
        className="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
