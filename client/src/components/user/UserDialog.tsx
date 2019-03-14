import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import { addUser } from 'src/actions';
import { connect } from 'react-redux';

export interface UserDialogProps {
  addUser: any;
}
export interface IUserDialogState {
  open: boolean;
  userName: string;
  nickName: string;
}
export class UserDialog extends React.Component<
  UserDialogProps,
  IUserDialogState
> {
  constructor(props: UserDialogProps) {
    super(props);
    this.state = {
      open: false,
      userName: "",
      nickName: ""
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.addUser(this.state.userName, this.state.nickName);
    this.setState({ userName: "", nickName: "" });

    this.setState({ open: false });
  };

  render() {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="userName"
            label="User Name"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="nickName"
            label="Nickname"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default connect(
  null,
  { addUser }
)(UserDialog);