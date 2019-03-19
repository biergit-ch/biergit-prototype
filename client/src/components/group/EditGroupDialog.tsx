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
import { IUser, User, Group, IGroup } from "src/models";

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

export interface EditGroupDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  group: IGroup;
  users: IUser[];
  onClose: Function;
}
export interface EditGroupDialogState {
  open: boolean;
  group: IGroup;
}
class EditGroupDialog extends React.Component<
  EditGroupDialogProps & WithStyles,
  EditGroupDialogState
> {
  constructor(props: EditGroupDialogProps, state: EditGroupDialogState) {
    super(props, state);
    this.state = {
      open: props.open,
      group: props.group
    };
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.props.onClose(this.state.group);
    this.setState({
      group: new Group("", new User(), [])
    });
  };

  handleChange(e: any) {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleOwnerSelectChange(event: any) {
    let user = event;
    if (user != null) {
      this.setState({ group: { ...this.state.group, owner: user } });
    }
  }

  handleMemberSelectChange(options: any) {
    debugger;
    this.setState({ group: { ...this.state.group, members: options } });
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
                  name="group.groupName"
                  value={this.state.group.groupName}
                  onChange={this.handleChange.bind(this)}
                  label="Group Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <InputLabel htmlFor="owner-select">Owner</InputLabel>
                {users == null || users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <Select
                    margin="dense"
                    options={users}
                    getOptionLabel={(option: IUser) => option.userName}
                    value={this.state.group.owner}
                    onChange={this.handleOwnerSelectChange.bind(this)}
                    inputProps={{
                      name: "group.owner",
                      id: "owner-select"
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} className={classes.gridItem}>
                <InputLabel htmlFor="members-select">Members</InputLabel>
                {users == null || users.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <Select
                    isMulti
                    options={users}
                    getOptionLabel={(option: IUser) => option.userName}
                    getOptionValue={(option: IUser) => option._id}
                    closeMenuOnSelect={false}
                    value={this.state.group.members}
                    margin="dense"
                    onChange={this.handleMemberSelectChange.bind(this)}
                    inputProps={{
                      name: "group.members",
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
  EditGroupDialog as any
);
