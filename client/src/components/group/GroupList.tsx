import * as React from "react";
import {
  Typography,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Grid,
  Paper,
  List,
  Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import NewGroupDialog from "./NewGroupDialog";
import { IGroup } from "./../../models";
import { GroupActions } from "./../../actions";
import { IUserState, IGroupState } from "src/reducers/state";
import GroupService from "src/services/group";
import GroupDetail from "./GroupDetail";

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200
    },
    dense: {
      marginTop: 19
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  });

interface GroupListState {
  openGroupDialog: boolean;
}
export interface GroupListProps extends WithStyles<typeof styles> {
  users: IUserState;
  groups: IGroupState;
  actions: GroupActions;
  openDialog: any;
}
export const GroupList = withStyles(styles)(
  class GroupList extends React.Component<
    GroupListProps & WithStyles<keyof typeof styles>,
    GroupListState
  > {
    state: GroupListState = {
      openGroupDialog: false
    };

    openGroupDialog() {
      this.setState({
        openGroupDialog: true
      });
    }

    callback = (newGroup: IGroup) => {
      this.setState({
        openGroupDialog: false
      });
      if (newGroup != null) {
        GroupService.create(newGroup).then((createdGroup: IGroup) => {
          this.props.actions.addGroup(createdGroup);
        });
      }
    };

    render() {
      const { groups, users, classes, actions } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h5">Users</Typography>
              <Typography>Hello there</Typography>
              <Typography>Below a list of all groups</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {groups == null || groups.groups.length <= 0 ? (
                  <Typography variant="body1">NO GROUPS</Typography>
                ) : (
                  <List>
                    {groups.groups.map((group, index) => (
                      <GroupDetail
                        key={index}
                        group={group}
                        actions={actions}
                        users={users.users}
                      />
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Fab onClick={() => this.openGroupDialog()}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
          <NewGroupDialog
            open={this.state.openGroupDialog}
            onClose={this.callback}
            users={users}
          />
        </div>
      );
    }
  }
);
export default withStyles(styles as any)(GroupList as any);
