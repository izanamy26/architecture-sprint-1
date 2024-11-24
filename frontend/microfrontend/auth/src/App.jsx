import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";

import * as auth from "./utils/auth";

import "./styles/index.css";

const App = ({ setAuthInfo }) => {
  const navigate = useNavigate();
  const [ email, setEmail ] = useState();

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setAuthInfo({ email, isLogin: false, status: "success" });
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    navigate("/signin");
  }

  function onRegister({ email, password }) {
    const info = {
      email,
      isLogin: false,
    };

    auth
      .register(email, password)
      .then(() => {
        setAuthInfo({ ...info, status: "success" });
        navigate("/signin");
      })
      .catch(() => {
        setAuthInfo({ ...info, status: "fail" });
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then(() => {
        setAuthInfo({ email, isLogin: true, status: "success" });
        setEmail(email);
        navigate("/");
      })
      .catch(() => {
        setAuthInfo({ email, isLogin: false, status: "fail" });
      });
  }

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setAuthInfo({
            email: res.data.email,
            isLogin: true,
          });

          setEmail(res.data.email);

          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [navigate]);

  return (
    <>
      
    <Routes>
    <Route exact path="/" element={
        <div className="header__wrapper">
          <p className="header__user">{email}</p>
          <button className="header__logout" onClick={onSignOut}>
            Выйти
          </button>
        </div>
    } />
      <Route
        exact
        path="/signup"
        element={<Register onRegister={onRegister} />}
      />
      <Route exact path="/signin" element={<Login onLogin={onLogin} />} />
    </Routes>
    </>
  );
};

const RouterWrapperApp = ({ setAuthInfo }) => (
  <BrowserRouter>
    <App setAuthInfo={setAuthInfo} />
  </BrowserRouter>
);

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(RouterWrapperApp);

export default RouterWrapperApp;
