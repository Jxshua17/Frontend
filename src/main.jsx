import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useContext } from "react";
import { AppProvider } from "./Context/Context.jsx";
import LoginForm from "./Login.jsx";
import Login from "./Login.jsx";
// import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Router> */}
      <AppProvider>
        <App />
      </AppProvider>
    {/* </Router> */}
  </React.StrictMode>
);
