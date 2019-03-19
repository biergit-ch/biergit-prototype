import * as React from "react";
import { IUser } from "src/models";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import UserService from "src/services/user";
import { UserActions } from "src/actions";

interface UserProps {
  user: IUser;
  actions: UserActions;
}

export class UserDetail extends React.Component<UserProps> {
  public deleteUser() {
    UserService.delete(this.props.user._id).then(() => {
      this.props.actions.actionFetchUsers();
    });
  }

  render() {
    return (
      <ListItem style={{ padding: "10px" }}>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={this.props.user.userName}
          secondary={this.props.user._id}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete" onClick={() => this.deleteUser()}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
