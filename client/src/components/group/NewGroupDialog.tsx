import * as React from "react";
import Select from "react-select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  withStyles,
  InputLabel,
  Typography,
  WithStyles,
  Theme,
  createStyles,
  Grid
} from "@material-ui/core";
import { IUser, User, Group } from "src/models";
import { IUserState } from "src/reducers/state";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    gridItem: {
      padding: theme.spacing.unit * 2,
      color: theme.palette.text.secondary
    }
  });

export interface NewGroupDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  users: IUserState;
  onClose: Function;
}
export interface NewGroupDialogState {
  open: boolean;
  groupName: string;
  owner: IUser;
  members: Array<IUser>;
}
class NewGroupDialog extends React.Component<
  NewGroupDialogProps & WithStyles,
  NewGroupDialogState
> {
  constructor(props: NewGroupDialogProps, state: NewGroupDialogState) {
    super(props, state);
    this.state = {
      open: props.open,
      groupName: "",
      owner: new User(),
      members: new Array<IUser>()
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose = () => {
    let groupModel = null;
    if (this.state && this.state.groupName && this.state.members) {
      groupModel = new Group(
        this.state.groupName,
        this.state.owner,
        this.state.members
      );
    }
    if (this.props) {
      this.props.onClose(groupModel);
      this.setState({
        groupName: "",
        owner: new User(),
        members: new Array<User>()
      });
    }
  };

  handleChange(e: any) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleOwnerSelectChange(event: any) {
    let user = event;
    if (user != null) {
      this.setState({ owner: user });
    }
  }

  handleMemberSelectChange(options: any) {
    debugger;
    this.setState({ members: options });
  }

  render() {
    const { users, classes } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Group</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12} className={classes.gridItem}>
                <DialogContentText>
                  To create a biergit group set a groupname, owner and add
                  members.
                </DialogContentText>
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="groupName"
                  value={this.state.groupName}
                  onChange={this.handleChange.bind(this)}
                  label="Group Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <InputLabel htmlFor="owner-select">Owner</InputLabel>
                {users == null || users.users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <Select
                    margin="dense"
                    options={users.users}
                    getOptionLabel={(option: IUser) => option.userName}
                    value={this.state.owner}
                    onChange={this.handleOwnerSelectChange.bind(this)}
                    inputProps={{
                      name: "owner",
                      id: "owner-select"
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <InputLabel htmlFor="members-select">Members</InputLabel>
                {users == null || users.users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <Select
                    isMulti
                    options={users.users}
                    getOptionLabel={(option: IUser) => option.userName}
                    getOptionValue={(option: IUser) => option._id}
                    closeMenuOnSelect={false}
                    value={this.state.members}
                    margin="dense"
                    onChange={this.handleMemberSelectChange.bind(this)}
                    inputProps={{
                      name: "members",
                      id: "members-select"
                    }}
                  />
                )}
              </Grid>
            </Grid>
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
      </div>
    );
  }
}
export default withStyles(styles as any, { withTheme: true })(
  NewGroupDialog as any
);
