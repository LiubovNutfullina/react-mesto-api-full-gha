import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [openTooltip, setOpenTooltip] = React.useState(false);
  const [tooltipInfo, setTooltipInfo] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(()=>{
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((userInfo) => {
          if (userInfo) {
            setLoggedIn(true);
            setCurrentUser({
              ...currentUser,
              email: userInfo.email,
            });
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  React.useEffect(()=>{
    if (loggedIn) {
      api.getUserInfo().then((profileInfo) => {
        setCurrentUser({
          ...currentUser,
          ...profileInfo,
        });
      })
      .catch((err) => {
        console.log(err);
      });

      api.getInitialCards().then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  React.useEffect(()=>{
    console.log(cards);
  }, [cards])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (card) => {
    setIsImagePopupOpen(!isImagePopupOpen);
    setSelectedCard(card);
  };

  const handleSubmit = (isSuccess) => {
    setOpenTooltip(!openTooltip);
    setTooltipInfo(isSuccess);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setOpenTooltip(false);
  };

  const handleCardLike = (card) => {
    console.log(card);
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? {...newCard, likes: newCard.likes.map(like => ({_id: like}))} : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? {...newCard, likes: newCard.likes.map(like => ({_id: like}))} : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => card._id !== item._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (user) => {
    api
      .editProfile(user.name, user.about)
      .then((res) => {
        console.log(res);
        setCurrentUser({
          ...currentUser,
          ...res,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (link) => {
    api
      .editAvatar(link)
      .then((res) => {
        console.log(res);
        setCurrentUser({
          ...currentUser,
          ...res,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (card) => {
    api
      .addNewCard(card.title, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleHeaderButtonClick = () => {
    localStorage.removeItem("jwt");
  };

  const handleLoginSubmit = (formValue, setFormValue) => {
    if (!formValue.email || !formValue.password) {
      return;
    }
    auth
      .authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          api.options.headers = {
            ...api.options.headers,
            Authorization: `Bearer ${data.token}`,
          };
          setFormValue({ email: "", password: "" });
        }
      })
      .then(()=> {
        const jwt = localStorage.getItem("jwt");
        return auth
        .checkToken(jwt)
        .then((userInfo) => {
          if (userInfo) {
            setLoggedIn(true);
            console.log(userInfo);
            setCurrentUser({
              ...currentUser,
              email: userInfo.email,
            });
            navigate("/", { replace: true });
          }
        })
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                handleHeaderButtonClick={handleHeaderButtonClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                email={currentUser._id}
                loggedIn={loggedIn}

              />
            }
          />

          <Route
            path="/sign-up"
            element={<Register onSubmit={handleSubmit} />}
          />

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} handleLoginSubmit={handleLoginSubmit} />}
          />
        </Routes>

        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={openTooltip}
          onClose={closeAllPopups}
          isSuccess={tooltipInfo}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
