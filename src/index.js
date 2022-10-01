import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.scss";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  rootElement
);
