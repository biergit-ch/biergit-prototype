import * as React from "react";
import { IGroup, IUser } from "src/models";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  List,
  Theme,
  WithStyles,
  createStyles,
  withStyles,
  Typography
} from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";

import GroupService from "src/services/group";
import { GroupActions } from "src/actions";
import EditGroupDialog from "./EditGroupDialog";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4
    }
  });

interface GroupDetailProps extends WithStyles<typeof styles> {
  group: IGroup;
  users: IUser[];
  actions: GroupActions;
}

interface GroupDetailState {
  expanded: boolean;
  openEditGroupDialog: boolean;
}

class GroupDetail extends React.Component<GroupDetailProps, GroupDetailState> {
  constructor(props: GroupDetailProps, state: GroupDetailState) {
    super(props, state);
    this.state = {
      expanded: false,
      openEditGroupDialog: false
    };
  }

  openGroupDialog() {
    this.setState({
      openEditGroupDialog: true
    });
  }

  callback = (editedGroup: IGroup) => {
    this.setState({
      openEditGroupDialog: false
    });
    debugger;
    if (editedGroup != null) {
      GroupService.update(editedGroup).then(() => {
        this.props.actions.actionFetchGroups();
      });
    }
  };

  public handleClick() {
    this.setState((state: GroupDetailState) => ({ expanded: !state.expanded }));
  }

  public editGroup() {
    this.setState({ openEditGroupDialog: true });
  }

  public deleteGroup() {
    GroupService.delete(this.props.group._id).then(() => {
      this.props.actions.actionFetchGroups();
    });
  }

  public removeUser(userToRemove: IUser) {
    let group = this.props.group;
    group.members = group.members.filter(user => user._id != userToRemove._id);
    GroupService.update(group).then(() => {
      this.props.actions.actionFetchGroups();
    });
  }

  render() {
    const { group, classes, users } = this.props;
    const { members } = this.props.group;

    return (
      <div>
        <ListItem
          style={{ padding: "10px" }}
          button
          onClick={() => this.handleClick()}
        >
          <ListItemAvatar>
            <Avatar>
              <GroupIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={group.groupName} secondary={group._id} />
          <ListItemSecondaryAction>
            {this.state.expanded ? (
              <IconButton onClick={() => this.handleClick()}>
                <ExpandLess />
              </IconButton>
            ) : (
              <IconButton onClick={() => this.handleClick()}>
                <ExpandMore />
              </IconButton>
            )}
            <IconButton aria-label="Edit" onClick={() => this.editGroup()}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => this.deleteGroup()}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          {members == null || members.length <= 0 ? (
            <Typography variant="body1">NO USERS</Typography>
          ) : (
            <List disablePadding component={"div" as any}>
              {members.map((user: IUser) => (
                <ListItem button className={classes.nested}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.userName} secondary={user._id} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => this.removeUser(user)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Collapse>
        <EditGroupDialog
          open={this.state.openEditGroupDialog}
          users={users}
          onClose={this.callback}
          group={group}
        />
      </div>
    );
  }
}
export default withStyles(styles as any)(GroupDetail as any);
