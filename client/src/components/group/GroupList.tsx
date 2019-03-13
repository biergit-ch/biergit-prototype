import * as React from 'react';

import axios from 'axios';
import {
  Button,
  TextField,
  Typography,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Grid,
  Paper
} from '@material-ui/core';

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

interface IState {
  data: Array<any>;
  id: number;
  message: string;
  intervalIsSet: any;
  idToDelete?: any;
  idToUpdate?: any;
  objectToUpdate: any;
  updateToApply: any;
}
export interface GroupListProps extends WithStyles<typeof styles> {}
export const GroupList = withStyles(styles)(
  class GroupList extends React.Component<
    GroupListProps & WithStyles<keyof typeof styles>,
    IState
  > {
    state: IState = {
      data: [],
      id: 0,
      message: '',
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
      updateToApply: null
    };

    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        //let interval = setInterval(this.getDataFromDb, 1000);
        //this.setState({ intervalIsSet: interval });
      }
    }

    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }

    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries

    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch(process.env.REACT_APP_API_URI + '/api/getData')
        .then(data => data.json())
        .then(res => this.setState({ data: res.data }));
    };

    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB(message: string) {
      let currentIds = this.state.data.map(data => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }

      axios.post(process.env.REACT_APP_API_URI + '/api/putData', {
        id: idToBeAdded,
        message: message
      });
    }

    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB(idTodelete: any) {
      let objIdToDelete = null;
      this.state.data.forEach(dat => {
        if (dat.id == idTodelete) {
          objIdToDelete = dat._id;
        }
      });

      axios.delete(process.env.REACT_APP_API_URI + '/api/deleteData', {
        data: {
          id: objIdToDelete
        }
      });
    }

    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB(idToUpdate: string, updateToApply: string) {
      let objIdToUpdate = null;
      this.state.data.forEach(dat => {
        if (dat.id == idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });

      axios.post(process.env.REACT_APP_API_URI + '/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply }
      });
    }

    render() {
      const { data } = this.state;
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant="headline">Groups</Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {data.length <= 0 ? (
                  <Typography variant="body1">NO GROUPS</Typography>
                ) : (
                  <ul>
                    {data.map(dat => (
                      <li style={{ padding: '10px' }} key={dat.id}>
                        <span style={{ color: 'gray' }}> id: </span> {dat.id}{' '}
                        <br />
                        <span style={{ color: 'gray' }}> data: </span>
                        {dat.message}
                      </li>
                    ))}
                  </ul>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  className={classes.textField}
                  onChange={e => this.setState({ message: e.target.value })}
                  placeholder="add something in the database"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  onClick={() => this.putDataToDB(this.state.message)}
                  variant="contained"
                >
                  ADD
                </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  className={classes.textField}
                  onChange={e => this.setState({ idToDelete: e.target.value })}
                  placeholder="put id of item to delete here"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  onClick={() => this.deleteFromDB(this.state.idToDelete)}
                  variant="contained"
                >
                  DELETE
                </Button>
              </form>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.container} noValidate autoComplete="off">
                <TextField
                  className={classes.textField}
                  onChange={e => this.setState({ idToUpdate: e.target.value })}
                  placeholder="id of item to update here"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  onChange={e =>
                    this.setState({ updateToApply: e.target.value })
                  }
                  placeholder="put new value of the item here"
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  onClick={() =>
                    this.updateDB(
                      this.state.idToUpdate,
                      this.state.updateToApply
                    )
                  }
                  variant="contained"
                >
                  UPDATE
                </Button>
              </form>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
);
