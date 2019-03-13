import * as React from 'react';
import './App.css';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import {
  createStyles,
  withStyles,
  WithStyles,
  Theme
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { Auth0Authentication } from 'src/auth/Auth0Authentication';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    }
  });
import 'typeface-roboto';
import { Grid } from '@material-ui/core';

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

export interface AppProps extends WithStyles<typeof styles> {
  auth: Auth0Authentication;
}
export const App = withStyles(styles)(
  class App extends React.Component<
    AppProps & WithStyles<keyof typeof styles>
  > {
    appLink = (props: any) => <Link to="/" {...props} />;
    homeLink = (props: any) => <Link to="/home" {...props} />;
    adminLink = (props: any) => <Link to="/admin" {...props} />;
    profileLink = (props: any) => <Link to="/profile" {...props} />;

    login() {
      this.props.auth.login();
    }

    logout() {
      this.props.auth.logout();
    }

    render() {
      const { classes } = this.props;
      const { authenticated, userHasScopes } = this.props.auth;
      return (
        <div className="App">
          <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
              <AppBar position="static" color="primary">
                <Toolbar>
                  <IconButton
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="Menu"
                    component={this.appLink}
                  >
                    <HomeIcon />
                  </IconButton>
                  <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.grow}
                    style={{ textAlign: 'left' }}
                  >
                    Biergit Prototype App
                  </Typography>
                  {authenticated && (
                    <Button component={this.homeLink}>Home</Button>
                  )}
                  {authenticated && (
                    <Button component={this.profileLink}>Profile</Button>
                  )}
                  {authenticated && userHasScopes(['write:messages']) && (
                    <Button component={this.adminLink}>Admin</Button>
                  )}
                  {!authenticated && (
                    <Button color="inherit" onClick={this.login.bind(this)}>
                      Log In
                    </Button>
                  )}
                  {authenticated && (
                    <Button color="inherit" onClick={this.logout.bind(this)}>
                      Log Out
                    </Button>
                  )}
                </Toolbar>
              </AppBar>
            </div>
            <Grid
              container
              spacing={24}
              justify="center"
              style={{ padding: 20 }}
            >
              <Grid item xs={3}>
                <Typography variant="h4">App Component</Typography>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </div>
      );
    }
  }
);
