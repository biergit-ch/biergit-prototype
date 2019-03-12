import * as React from 'react';
import { render } from 'react-dom';
import 'typeface-roboto';
import Routes from './utils/Routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import * as dotenv from "dotenv";

dotenv.config();


render(<Routes />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
