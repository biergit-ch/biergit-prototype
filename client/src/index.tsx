import "./index.css";

import "typeface-roboto";

import * as React from "react";
import * as ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import * as dotenv from "dotenv";

import { Provider } from "react-redux";

import Routes from "./utils/Routes";
import store from "./store";

dotenv.config();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  rootElement
);

registerServiceWorker();
