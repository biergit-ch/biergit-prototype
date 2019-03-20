import * as React from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Grid, Paper } from '@material-ui/core';
import { UserList } from '../user/UserList';
import { GroupList } from '../group/GroupList';
import { AppState } from './../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IUserState, IGroupState } from 'src/reducers/state';
import { GroupActions, UserActions } from 'src/actions';
import { bindActionCreators } from 'redux';
import { omit } from 'src/utils';
import { IUser, User, UserProfile } from 'src/models';
import UserService from 'src/services/user';

export interface HomeProps extends RouteComponentProps<void> {
  auth: Auth0Authentication;
  groups: IGroupState;
  users: IUserState;
  dispatch: any;
  userActions: UserActions;
  groupActions: GroupActions;
}
interface HomeState {
  currentUser: IUser;
  currentUserProfile: UserProfile;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps, state: HomeState) {
    super(props, state);
    let emptyObj: any = {};
    this.state = {
      currentUser: emptyObj,
      currentUserProfile: emptyObj
    };
  }
  componentDidMount() {
    if (this.props.auth != null) {
      this.props.auth.getProfile().then(userProfile => {
        this.setState({
          currentUserProfile: userProfile
        });
      });
    }
    if (this.props.groups.state === 'INIT') {
      const { dispatch } = this.props;
      dispatch(GroupActions.actionFetchGroups());
    }
    if (this.props.users.state === 'INIT') {
      const { dispatch } = this.props;
      dispatch(UserActions.actionFetchUsers());
    }
  }

  componentDidUpdate() {
    if (this.state.currentUser) {
      if (
        Object.entries(this.state.currentUser).length === 0 &&
        this.state.currentUser.constructor === Object
      ) {
        this.updateCurrentUser();
      }
    }
  }

  private updateCurrentUser() {
    const { currentUserProfile } = this.state;
    const { users } = this.props.users;
    if (currentUserProfile && users && currentUserProfile.email) {
      let user = users.find(u => u.email == currentUserProfile.email);
      if (user) {
        this.setState({
          currentUser: user
        });
      } else {
        if (this.props.users.state == 'LOADED') {
          this.createNewUser(currentUserProfile);
        }
      }
    }
  }

  private createNewUser(currentUserProfile: UserProfile) {
    const user = new User(
      currentUserProfile.name,
      currentUserProfile.nickname,
      currentUserProfile.email,
      currentUserProfile.picture
    );
    this.setState({
      currentUser: user
    });
    UserService.create(user).then(() => {
      this.props.dispatch(UserActions.actionFetchUsers());
    });
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper style={{ padding: 10 }}>{this.renderUsers()}</Paper>
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

  renderUsers() {
    if (this.props.users.state === 'LOADING') {
      return <p>Loading ...</p>;
    } else if (this.props.users.state === 'ERROR') {
      return <p>Error:</p>;
    } else if (this.props.users.state === 'LOADED') {
      return (
        <UserList
          name={this.state.currentUser.nickName}
          openDialog="false"
          actions={this.props.userActions}
          users={this.props.users}
        />
      );
    } else {
      return 'Init State';
    }
  }
}

function mapStateToProps(state: AppState, ownProps: HomeProps) {
  const { users, groups } = state;
  return {
    users,
    groups
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    dispatch,
    groupActions: bindActionCreators(omit(GroupActions, 'Type'), dispatch),
    userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
