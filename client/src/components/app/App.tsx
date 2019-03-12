import * as React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

import { ToolBar } from '..';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { History } from 'history';

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

export interface AppProps {
  auth: Auth0Authentication;
  history: History;
}

const styles = {
  root: "",
  grow: "",
  menuButton: ""
};

export class App extends React.Component<AppProps> {
  public render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <ToolBar history={this.props.history} auth={this.props.auth} classes={styles}/>
          </MuiThemeProvider>
        </React.Fragment>
      </div>
    );
  }
}
