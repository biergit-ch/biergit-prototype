import * as React from 'react';
import { UserDetail } from './UserDetail';
import {
  Typography,
  Grid,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  Paper,
  Button
} from '@material-ui/core';
import { UserDialog } from './UserDialog';
import { IUser } from 'src/models';
import { UserActions } from 'src/actions';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    dense: {
      marginTop: 19
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  });

interface UserListState {
  openUserDialog: boolean;
}

export interface UserListProps extends WithStyles<typeof styles> {
  name: string;
  openDialog: any;
  users: Array<IUser>;
  actions: UserActions;
}
export const UserList = withStyles(styles)(
  class UserList extends React.Component<
    UserListProps & WithStyles<keyof typeof styles>,
    UserListState
  > {
    state: UserListState;
    userList: Array<IUser>;

    constructor(props: UserListProps) {
      super(props);
      this.state = {
        openUserDialog: false
      };
    }

    openUserDialog() {
      this.setState({
        openUserDialog: true
      });
    }

    callback = (user: IUser) => {
      this.setState({
        openUserDialog: false
      });
      this.props.actions.addUser(user);
    };

    render() {
      const { users } = this.props;
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h5">Users</Typography>
              <Typography>Hello, {this.props.name}</Typography>
              <Typography>Below a list of all users</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {users == null || users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <ul>
                    {users.map(user => (
                      <UserDetail user={user} key={user._id} />
                    ))}
                  </ul>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => this.openUserDialog()}>
                ADD
              </Button>
            </Grid>
          </Grid>
          <UserDialog
            open={this.state.openUserDialog}
            onClose={this.callback}
          />
        </div>
      );
    }
  }
);
export default withStyles(styles as any)(UserList as any);
