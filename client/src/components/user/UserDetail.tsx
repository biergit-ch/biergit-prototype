import * as React from 'react';
import { IUser } from 'src/models';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  WithStyles,
  createStyles,
  withStyles
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UserService from 'src/services/user';
import { UserActions } from 'src/actions';
import { EditUserDialog } from './EditUserDialog';

const styles = createStyles({
  avatar: {
    margin: 10
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  }
});

interface UserDetailProps extends WithStyles<typeof styles> {
  user: IUser;
  actions: UserActions;
}

interface UserDetailState {
  openEditUserDialog: boolean;
}

class UserDetail extends React.Component<UserDetailProps, UserDetailState> {
  constructor(props: UserDetailProps, state: UserDetailState) {
    super(props, state);
    this.state = {
      openEditUserDialog: false
    };
  }

  public deleteUser() {
    UserService.delete(this.props.user._id).then(() => {
      this.props.actions.actionFetchUsers();
    });
  }
  public editUser() {
    this.setState({ openEditUserDialog: true });
  }

  callbackEdit = (user: IUser) => {
    this.setState({
      openEditUserDialog: false
    });
    if (user != null) {
      UserService.update(user).then((user: IUser) => {
        this.props.actions.editUser(user);
      });
    }
  };

  render() {
    const { user, classes } = this.props;
    console.log(user.pictureUrl);
    return (
      <div>
        <ListItem>
          <ListItemAvatar>
            {user.pictureUrl ? (
              <Avatar
                alt="PersonIcon"
                src={user.pictureUrl}
                className={classes.avatar}
              />
            ) : (
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            )}
          </ListItemAvatar>
          <ListItemText primary={user.userName} secondary={user._id} />
          <ListItemSecondaryAction>
            <IconButton aria-label="Edit" onClick={() => this.editUser()}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => this.deleteUser()}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <EditUserDialog
          open={this.state.openEditUserDialog}
          onClose={this.callbackEdit}
          user={user}
        />
      </div>
    );
  }
}
export default withStyles(styles as any)(UserDetail as any);
