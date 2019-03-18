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
  Select,
  InputLabel,
  Typography
} from "@material-ui/core";
import { IUser, User, Group } from "src/models";
import { IUserState } from "src/reducers/state";

const styles = (theme: any) => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

function getStyles(user: IUser, that: any) {
  if (user != null && that.props.users.users != null) {
    return {
      fontWeight:
        that.props.users.users.indexOf(user) === -1
          ? that.props.theme.typography.fontWeightRegular
          : that.props.theme.typography.fontWeightMedium
    };
  }
  return that.props.theme.typography.fontWeightRegular;
}

export interface GroupDialogProps {
  open: boolean;
  users: IUserState;
  onClose: Function;
}
export interface IGroupDialogState {
  open: boolean;
  groupName: string;
  owner: IUser;
  members: Array<IUser>;
}
class GroupDialog extends React.Component<GroupDialogProps, IGroupDialogState> {
  constructor(props: GroupDialogProps, state : IGroupDialogState) {
    super(props, state);
    this.state = {
      open: props.open,
      groupName: '',
      owner: new User(),
      members: new Array<IUser>()
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    let groupModel = new Group(
      this.state.groupName,
      this.state.owner,
      this.state.members
    );

    this.props.onClose(groupModel);
    this.setState({
      groupName: "",
      owner: new User(),
      members: new Array<User>()
    });
  }

  handleChange(e: any) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleChangeMultiple = (event: any) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      members: value
    });
  };

  render() {
    const { users } = this.props;
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
            name="groupName"
            value={this.state.groupName}
            onChange={this.handleChange.bind(this)}
            label="Group Name"
            fullWidth
          />
          <InputLabel htmlFor="owner-select">Owner</InputLabel>
          {users == null || users.users.length <= 0 ? (
            <Typography variant="body1">NO USERS</Typography>
          ) : (
            <Select
              margin="dense"
              value={this.state.owner}
              onChange={this.handleChange.bind(this)}
              inputProps={{
                name: "owner",
                id: "owner-select"
              }}
            >
              {users.users.map(user => (
                <option
                  key={user.userName}
                  value={user.userName}
                  style={getStyles(user, this)}
                >
                  {user.userName}
                </option>
              ))}
            </Select>
          )}
          <InputLabel htmlFor="members-select">Members</InputLabel>
          {users == null || users.users.length <= 0 ? (
            <Typography variant="body1">NO USERS</Typography>
          ) : (
            <Select
              multiple={true}
              margin="dense"
              value={this.state.members}
              onChange={this.handleChange.bind(this)}
              inputProps={{
                name: "members",
                id: "members-select"
              }}
            >
              {users.users.map(user => (
                <option
                  key={user.userName}
                  value={user.userName}
                  style={getStyles(user, this)}
                >
                  {user.userName}
                </option>
              ))}
            </Select>
          )}
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
export default withStyles(styles as any, { withTheme: true })(
  GroupDialog as any
);
