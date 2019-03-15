import * as React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import 'typeface-roboto';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { configureStore } from './../../store';
import { WebAuthentication } from 'src/auth';
import AppNavBar from './../../navigation/AppNavBar';
import history from './../../utils/History';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: red
  },
  spacing: { unit: 8 },
  typography: {
    useNextVariants: true
  }
});
const store = configureStore();
const auth = new WebAuthentication();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <AppNavBar auth={auth} />
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
export default App;
