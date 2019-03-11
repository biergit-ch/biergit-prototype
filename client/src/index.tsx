import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as dotenv from "dotenv";

dotenv.config();
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
