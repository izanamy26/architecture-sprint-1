import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../../utils/api";

function Card({ card, onCardClick, setCards, userId }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  const currentUser = React.useContext(CurrentUserContext);

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleLikeClick() {
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_is-active"
  }`;

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "card__delete-button_visible" : "card__delete-button_hidden"
  }`;

  return (
    <li className="places__item card">
      <div
        className="card__image"
        style={cardStyle}
        onClick={handleClick}
      ></div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
