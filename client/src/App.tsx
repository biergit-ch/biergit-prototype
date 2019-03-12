import * as React from 'react';
import './App.css';

import bier from './bier.svg';

import { GroupList, UserList } from './components';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {
    useNextVariants: true
  }
});

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <AppBar position="static" color="default">
            <Toolbar>
              <img src={bier} className="App-logo" alt="logo" />
              <Typography variant="h6" color="inherit">
                Biergit
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <Paper>
                <UserList name="CurrentUser" />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper>
                <GroupList />
              </Paper>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
