import React from "react";
import ReactDOM from "react-dom/client";

import Card from "./components/Card";

import api from "./utils/api";

import "./index.css";

const App = () => {

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getCardList()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
        {cards.map((card) => (
            <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                />
            ))}
    </>
)};

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)