import * as React from 'react';
import {
  Typography,
  Grid,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  Paper,
  List,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { NewUserDialog } from './NewUserDialog';
import { IUser } from 'src/models';
import { UserActions } from 'src/actions';
import { IUserState } from 'src/reducers/state';
import UserService from 'src/services/user';
import UserDetail from './UserDetail';

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
  openNewUserDialog: boolean;
}

export interface UserListProps extends WithStyles<typeof styles> {
  name: string;
  openDialog: any;
  actions: UserActions;
  users: IUserState;
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
        openNewUserDialog: false
      };
    }

    openNewUserDialog() {
      this.setState({
        openNewUserDialog: true
      });
    }

    callbackCreate = (user: IUser) => {
      this.setState({
        openNewUserDialog: false
      });
      if (user != null) {
        UserService.create(user).then((user: IUser) => {
          this.props.actions.actionFetchUsers();
        });
      }
    };

    render() {
      const { users, classes, actions } = this.props;
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
                {users == null || users.users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <List>
                    {users.users.map(user => (
                      <UserDetail
                        user={user}
                        key={user._id}
                        actions={actions}
                      />
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Fab onClick={() => this.openNewUserDialog()}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <NewUserDialog
            open={this.state.openNewUserDialog}
            onClose={this.callbackCreate}
          />
        </div>
      );
    }
  }
);
export default withStyles(styles as any)(UserList as any);
