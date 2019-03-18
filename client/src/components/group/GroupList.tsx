import * as React from 'react';
import {
  Button,
  Typography,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Grid,
  Paper
} from '@material-ui/core';
import GroupDialog from './GroupDialog';
import { IGroup } from './../../models';
import { GroupActions } from './../../actions';
import { RootState } from './../../reducers';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
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
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  });

interface GroupListState {
  openGroupDialog: boolean;
}
export interface GroupListProps extends WithStyles<typeof styles> {
  users: RootState.UserState;
  groups: RootState.GroupState;
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

    callback(groupModel: IGroup) {
      this.setState({
        openGroupDialog: false
      });
      this.props.actions.addGroup(groupModel);
    }

    render() {
      const { groups, users } = this.props;
      const { classes } = this.props;
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
                {groups == null || groups.length <= 0 ? (
                  <Typography variant="body1">NO GROUPS</Typography>
                ) : (
                  <ul>
                    {groups.map((group, index) => (
                      <li style={{ padding: '10px' }} key={index}>
                        <span style={{ color: 'gray' }}> id: </span> {group._id}{' '}
                        <br />
                        <span style={{ color: 'gray' }}> name: </span>
                        {group.groupName}
                      </li>
                    ))}
                  </ul>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => this.openGroupDialog()}
              >
                ADD
              </Button>
            </Grid>
          </Grid>
          <GroupDialog
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
