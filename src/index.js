import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductCartProvider } from "./contexts/product-cart.context";

import "./index.scss";
import { CategoriesProvider } from "./contexts/categories.context";
import { Provider } from "react-redux";
import { store } from "./store/store";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <CategoriesProvider>
            <ProductCartProvider>
              <App />
            </ProductCartProvider>
          </CategoriesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
