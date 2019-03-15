import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  AppBar
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Auth0Authentication } from 'src/auth/Auth0Authentication';
import { Routes } from 'src/utils/Routes';
import { Link } from 'react-router-dom';

const styles = createStyles({
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
export interface AppProps extends WithStyles<typeof styles> {
  auth: Auth0Authentication;
}
class AppNavBar extends React.Component<
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
    const authenticated = this.props.auth.authenticated;
    return (
      <div className="App">
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
              {authenticated && <Button color="inherit" component={this.homeLink}>Home</Button>}
              {authenticated && (
                <Button color="inherit" component={this.profileLink}>Profile</Button>
              )}
              {authenticated && (
                <Button color="inherit" component={this.adminLink}>Admin</Button>
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

        <Grid container spacing={24} justify="center" style={{ padding: 20 }}>
          <Grid item xs={12}>
            <Routes auth={this.props.auth}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// export interface AppProps extends WithStyles<typeof styles> {
//   auth: Auth0Authentication;
//   userActions: UserActions;
//   groupActions: GroupActions;
// }

// const mapStateToProps = (state: AppState) => ({
//   authenticated: state.authenticated,
//   users: state.users,
//   groups: state.groups
// });

// const mapDispatchtoProps = (
//   dispatch: Dispatch
// ): Pick<AppProps, 'userActions' | 'groupActions'> => ({
//   userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
//   groupActions: bindActionCreators(omit(GroupActions, 'Type'), dispatch)
// });

export default withStyles(styles as any, { withTheme: true })(AppNavBar as any);
