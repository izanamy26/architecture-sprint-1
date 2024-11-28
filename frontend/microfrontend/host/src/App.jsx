import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithForm from "common/PopupWithForm";
import ImagePopup from "cards/ImagePopup";
import CurrentUserContext from "common/CurrentUserContext";
import EditProfilePopup from "profile/EditProfilePopup";
import EditAvatarPopup from "profile/EditAvatarPopup";
import AddPlacePopup from "cards/AddPlacePopup";
;
import InfoTooltip from "./components/InfoTooltip";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  // function handleEditProfileClick() {
  //   setIsEditProfilePopupOpen(true);
  // }

  // function handleAddPlaceClick() {
  //   setIsAddPlacePopupOpen(true);
  // }

  // function handleEditAvatarClick() {
  //   setIsEditAvatarPopupOpen(true);
  // }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    // setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    // setIsInfoToolTipOpen(false);
    // setSelectedCard(null);
  }

  // function handleCardClick(card) {
  //   setSelectedCard(card);
  // }

  function setAuthInfo({
    email,
    isLogin,
    status,
  }) {
    setEmail(email);
    setIsLoggedIn(isLogin);
    setTooltipStatus(status);
    setIsInfoToolTipOpen(true);
  }

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        Host
        <Header setAuthInfo={setAuthInfo} />
        <Routes>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            onAddPlace={handleAddPlaceClick}
            loggedIn={isLoggedIn}
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          setCurrentUser={setCurrentUser}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          setCards={setCards}
          onClose={closeAllPopups}
        />
        <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          setCurrentUser={setCurrentUser}
          onClose={closeAllPopups}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
