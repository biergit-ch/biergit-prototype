import * as React from "react";
import { Auth0Authentication } from "../../auth/Auth0Authentication";
import { Grid, Paper } from "@material-ui/core";
import { UserList } from "../user/UserList";
import { GroupList } from "../group/GroupList";
import { AppState } from "./../../reducers";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { IUserState, IGroupState } from "src/reducers/state";
import { GroupActions, UserActions } from 'src/actions';

export interface HomeProps extends RouteComponentProps<void> {
  auth: Auth0Authentication;
  groups: IGroupState;
  users: IUserState;
  dispatch: any;
  // userActions: UserActions;
  // groupActions: GroupActions;
}
interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps, state: HomeState) {
    super(props, state);
    this.state = {
      
    }
  }
  componentDidMount() {
    if (this.props.groups.state === "INIT") {
      const { dispatch } = this.props
      dispatch(GroupActions.actionFetchGroups());
    }
    if (this.props.users.state === "INIT") {
      const { dispatch } = this.props
      dispatch(UserActions.actionFetchUsers());
    }
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
                // actions={this.props.users}
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
    debugger;
    if (this.props.users.state === "LOADING") {
      return <p>Loading ...</p>;
    } else if (this.props.users.state === "ERROR") {
      return <p>Error:</p>;
    } else if (this.props.users.state === "LOADED") {
      return (
        <UserList
          name="CurrentUser"
          openDialog="false"
          // actions={this.props.userActions}
          users={this.props.users}
        />
      );
    } else {
      return "Init State";
    }
  }
}

function mapStateToProps(state: AppState, ownProps: HomeProps) {
  debugger;
  const { users, groups } = state;

  return {
    users,
    groups
  };
}

// // binding an object full of action creators
// function mapDispatchToProps(dispatch: any) {
//   return {
//     dispatch,
//     groupActions: bindActionCreators(omit(GroupActions, "Type"), dispatch),
//     userActions: bindActionCreators(omit(UserActions, "Type"), dispatch)
//   };
// }

export default connect(
  mapStateToProps,
  null
)(Home);
