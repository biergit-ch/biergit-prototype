import * as React from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Grid, Paper } from '@material-ui/core';
import { UserList } from '../user/UserList';
import { GroupList } from '../group/GroupList';
import { RootState } from './../../reducers';
import { UserActions, GroupActions } from './../../actions';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';
import { omit } from 'src/utils';

export interface HomeProps extends RouteComponentProps<void> {
  loadUsers: () => () => void;
  loadGroups: () => () => void;
  userState: string,
  groupState: string,
  auth: Auth0Authentication;
  groups: RootState.GroupState;
  users: RootState.UserState;
  userActions: UserActions;
  groupActions: GroupActions;
}
interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps, state: HomeState) {
    super(props, state);
  }
  componentDidMount() {
    if (this.props.groupState === 'INIT'){
      this.props.loadGroups();
    }
    if (this.props.userState === 'INIT'){
      this.props.loadUsers();
    }
  }
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper style={{ padding: 10 }}>
              <UserList
                name="CurrentUser"
                openDialog="false"
                actions={this.props.userActions}
                users={this.props.users}
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{ padding: 10 }}>
              <GroupList
                openDialog="false"
                actions={this.props.groupActions}
                users={this.props.users}
                groups={this.props.groups}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: HomeProps) {
  return { users: state.users, groups: state.groups, groupState: 'INIT', userState: 'INIT' };
}

// binding an object full of action creators
function mapDispatchToProps(dispatch: any) {
  return {
    dispatch,
    loadGroups: () => dispatch(GroupActions.actionFetchGroups()),
    loadUsers: () => dispatch(UserActions.actionFetchUsers()),
    groupActions: bindActionCreators(omit(GroupActions, 'Type'), dispatch),
    userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
