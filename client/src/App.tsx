import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { GroupList, UserList } from './components';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Biergit</h1>
        </header>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <UserList name="CurrentUser" />
            </Grid>
            <Grid item xs={3}>
              <GroupList />
            </Grid>
          </Grid>
        </MuiThemeProvider>

      </div>
    );
  }
}

export default App;
