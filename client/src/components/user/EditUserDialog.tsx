import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  withStyles,
  createStyles
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { User, IUser } from 'src/models';

const styles = createStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

export interface UserDialogProps {
  open: boolean;
  user: IUser;
  onClose: Function;
}
export interface IUserDialogState {
  open: boolean;
  user: IUser;
}
export class EditUserDialog extends React.Component<
  UserDialogProps,
  IUserDialogState
> {
  constructor(props: UserDialogProps, state: IUserDialogState) {
    super(props, state);
    this.state = {
      open: props.open,
      user: props.user
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose = () => {
    if (this.state && this.state.user && this.state.user.userName) {
      if (this.props) {
        this.props.onClose(this.state.user);
      }
    }
    this.setState({ user: new User() });
  };

  handleChange(e: any) {
    let user: any = {};
    user = { ...this.state.user };
    user[e.target.name] = e.target.value;
    this.setState({ user: user });
  }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create biergit user simply add a username and nickname.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="email"
            value={this.state.user.email}
            onChange={this.handleChange.bind(this)}
            label="Email Address"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            value={this.state.user.userName}
            onChange={this.handleChange.bind(this)}
            label="Username"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="nickName"
            value={this.state.user.nickName}
            onChange={this.handleChange.bind(this)}
            label="Nickname"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="pictureUrl"
            value={this.state.user.pictureUrl}
            onChange={this.handleChange.bind(this)}
            label="Profile Picture"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose.bind(this)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default withStyles(styles as any)(EditUserDialog as any);
