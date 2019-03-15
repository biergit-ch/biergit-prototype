import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  withStyles,
  createStyles,
} from "@material-ui/core";
import { blue } from '@material-ui/core/colors';

const styles = createStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface UserDialogProps {
  open: boolean;
  onClose: Function;
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
      open: props.open,
      userName: "",
      nickName: ""
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.props.onClose(this.state.userName, this.state.nickName);
    this.setState({ userName: "", nickName: "" });
  };

  handleChange(e: any) {
    // If you are using babel, you can use ES 6 dictionary syntax
    // let change = { [e.target.name] = e.target.value }
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
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
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange.bind(this)}
            label="User Name"
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
export default withStyles(styles as any)(UserDialog as any);
