import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";

// import "./index.css";

const App = () => {

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  return null
};

// const rootElement = document.getElementById("app")
// if (!rootElement) throw new Error("Failed to find the root element")

// const root = ReactDOM.createRoot(rootElement)

// root.render(<App />)