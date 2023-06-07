import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";
import Footer from "./Footer";
import Header from "./Header";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="content">
      <Header
        onButtonClick={props.handleHeaderButtonClick}
        buttonText="Выйти"
        email={currentUser.email}
        linkPath="/sign-in"
      />
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Изменить аватар"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              alt="Здесь изображен аватар"
              src={currentUser.avatar}
            />
          </button>
        </div>
        <div className="profile__info">
          <div className="profile__title-button-wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="Редактировать"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
            onCardClick={props.onCardClick}
            card={card}
            key={card._id}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}

export default Main;
