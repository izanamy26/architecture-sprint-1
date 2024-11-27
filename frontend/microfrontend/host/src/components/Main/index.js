import React from "react";
import CardListing from "cards/Card";
import Profile from "profile/Profile";
import { CurrentUserContext } from "common/CurrentUserContext";

function Main({ onAddPlace }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <Profile currentUser={currentUser} />
      <button
        className="profile__add-button"
        type="button"
        onClick={onAddPlace}
      ></button>
      <section className="places page__section">
        <ul className="places__list">
          <CardListing />
        </ul>
      </section>
    </main>
  );
}

export default Main;
