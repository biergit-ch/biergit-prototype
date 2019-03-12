import * as React from 'react';
import './App.css';

import { GroupList, UserList, ToolBar } from './components';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';

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

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <React.Fragment>
          <CssBaseline />
          <MuiThemeProvider theme={theme}>
            <ToolBar />
            <div style={{ padding: 20 }}>
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
            </div>
          </MuiThemeProvider>
        </React.Fragment>
      </div>
    );
  }
}

export default App;
