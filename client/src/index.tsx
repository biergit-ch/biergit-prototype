import "./index.css";

import "typeface-roboto";

import * as React from "react";
import * as ReactDOM from "react-dom";

import registerServiceWorker from "./registerServiceWorker";
import * as dotenv from "dotenv";
import App from './containers/App/App';

dotenv.config();

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();