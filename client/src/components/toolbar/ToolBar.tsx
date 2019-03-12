import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { History } from 'history';
import { Auth0Authentication } from 'src/auth/Auth0Authentication';

const styles =  (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});
export interface Props extends WithStyles<typeof styles> {
  auth: Auth0Authentication;
  history: History;
  classes: any;
}

export class ToolBar extends React.Component<Props> {
  goTo(route: string) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Biergit Prototype App
            </Typography>
            {
              !this.props.auth.authenticated && (
                  <Button color="inherit" onClick={this.login.bind(this)}>Log In</Button>
                )
            }
            {
              this.props.auth.authenticated && (
                  <Button color="inherit" onClick={this.logout.bind(this)}>Log Out</Button>
                )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ToolBar);
