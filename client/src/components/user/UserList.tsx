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
import { connect } from "react-redux";
import { openUserDialog } from "src/actions";

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
        userList: new Array<UserModel>()
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

    openUserDialog() {
      this.props.openDialog(true);
    }

    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="headline">Users</Typography>
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
        </div>
      );
    }
  }
);

// const mapStateToProps = (state, ownProps) => ({
//   // ... computed data from state and optionally ownProps
// })

// const mapDispatchToProps = {
//   // ... normally is an object full of action creators
// }

export default connect(
  null,
  { openUserDialog }
)(UserList);
