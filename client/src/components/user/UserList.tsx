import * as React from "react";
import { UserModel } from "src/models";
import axios, { AxiosResponse } from "axios";
import { User } from "./User";
import {
  Typography,
  Grid,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
  Paper,
  Button
} from "@material-ui/core";
import { UserDialog } from "./UserDialog";

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

interface IState {
  userList: Array<UserModel>;
  openUserDialog: boolean;
}

export interface UserListProps extends WithStyles<typeof styles> {
  name: string;
  openDialog: any;
}
export const UserList = withStyles(styles)(
  class UserList extends React.Component<
    UserListProps & WithStyles<keyof typeof styles>,
    IState
  > {
    state: IState;
    userList: Array<UserModel>;

    constructor(props: UserListProps) {
      super(props);
      this.state = {
        userList: new Array<UserModel>(),
        openUserDialog: false
      };
    }

    public componentDidMount() {
      this.getData();
    }

    getData() {
      axios
        .get<AxiosResponse>(process.env.REACT_APP_API_URI + "/users")
        .then(res => this.setState({ userList: res.data.data }));
    }

    addUser(userName: string, nickName: string) {
      axios
        .post<AxiosResponse>(process.env.REACT_APP_API_URI + "/users", {
          userName,
          nickName
        })
        .then(res => this.setState({ userList: res.data.data }));
    }

    openUserDialog() {
      this.setState({
        openUserDialog: true
      });
    }

    callback = (userName: string, nickName: string) => {
      this.setState({
        openUserDialog: false
      });
      this.addUser(userName, nickName);
    };

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="h5">Users</Typography>
              <Typography>Hello, {this.props.name}</Typography>
              <Typography>Below a list of all users</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {this.state.userList.length <= 0 ? (
                  <Typography variant="body1">NO USERS</Typography>
                ) : (
                  <ul>
                    {this.state.userList.map(user => (
                      <User user={user} />
                    ))}
                  </ul>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => this.openUserDialog()}>
                ADD
              </Button>
            </Grid>
          </Grid>
          <UserDialog
            open={this.state.openUserDialog}
            onClose={this.callback}
          />
        </div>
      );
    }
  }
);

// export interface AppProps extends WithStyles<typeof styles> {
//   auth: Auth0Authentication;
//   userActions: UserActions;
//   groupActions: GroupActions;
// }

// const mapStateToProps = (state: AppState) => ({
//   authenticated: state.authenticated,
//   users: state.users,
//   groups: state.groups
// });

// const mapDispatchtoProps = (
//   dispatch: Dispatch
// ): Pick<AppProps, 'userActions' | 'groupActions'> => ({
//   userActions: bindActionCreators(omit(UserActions, 'Type'), dispatch),
//   groupActions: bindActionCreators(omit(GroupActions, 'Type'), dispatch)
// });
