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
import { User } from 'src/models';

const styles = createStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

export interface UserDialogProps {
  open: boolean;
  onClose: Function;
}
export interface IUserDialogState {
  open: boolean;
  userName: string;
  nickName: string;
  email: string;
  pictureUrl: string;
}
export class NewUserDialog extends React.Component<
  UserDialogProps,
  IUserDialogState
> {
  constructor(props: UserDialogProps, state: IUserDialogState) {
    super(props, state);
    this.state = {
      open: props.open,
      userName: '',
      nickName: '',
      email: '',
      pictureUrl: ''
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose = () => {
    let user = null;
    if (this.state && this.state.userName && this.state.email) {
      user = new User(
        this.state.userName,
        this.state.nickName,
        this.state.email,
        this.state.pictureUrl
      );
    }
    if (this.props) {
      this.props.onClose(user);
    }
    this.setState({ userName: '', nickName: '', email: '', pictureUrl: '' });
  };

  handleChange(e: any) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
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
            value={this.state.email}
            onChange={this.handleChange.bind(this)}
            label="Email Address"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
            label="Username"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="nickName"
            value={this.state.nickName}
            onChange={this.handleChange.bind(this)}
            label="Nickname"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="pictureUrl"
            value={this.state.pictureUrl}
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
export default withStyles(styles as any)(NewUserDialog as any);
