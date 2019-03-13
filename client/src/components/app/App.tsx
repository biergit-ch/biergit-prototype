import * as React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

import { ToolBar } from '..';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { History } from 'history';
import { Typography, Grid } from '@material-ui/core';
import 'typeface-roboto';

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

export class App extends React.Component<AppProps> {
  public render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <ToolBar history={this.props.history} auth={this.props.auth} />
          <Grid container spacing={24} justify="center" style={{ padding: 20 }}>
            <Grid item xs={3}>
              <Typography variant="h4">App Component</Typography>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}
