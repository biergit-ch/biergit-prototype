import * as React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import 'typeface-roboto';
import { Route } from 'react-router-dom';
import AppNavBar from './../../navigation/AppNavBar';
import { Store } from 'redux';
import { Auth0Authentication } from 'src/auth/Auth0Authentication';

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

export interface AppComponents {
  store: Store;
  auth: Auth0Authentication;
}
class App extends React.Component<AppComponents> {
  public render() {
    const { auth } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <Route path="/" render={props => <AppNavBar auth={auth} {...props} />} />
      </MuiThemeProvider>
    );
  }
}
export default App;
