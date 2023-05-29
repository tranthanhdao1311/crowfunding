import React from "react";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// const container = document.getElementById("root");
// const root = createRoot(container);

// root.render(

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer></ToastContainer>
    <ScrollToTop></ScrollToTop>
  </Provider>,
  document.getElementById("root")
);

// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
