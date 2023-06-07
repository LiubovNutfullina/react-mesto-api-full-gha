import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick({
      name: props.card.name,
      link: props.card.link,
    });
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
      />
      {isOwn && (
        <button
          type="button"
          className="element__trash"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleCardLike}
          ></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
