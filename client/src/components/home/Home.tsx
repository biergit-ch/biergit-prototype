import autobind from 'autobind-decorator';
import * as React from 'react';
import { Component } from 'react';
import { Auth0Authentication } from '../../auth/Auth0Authentication';
import { Grid, Paper } from '@material-ui/core';
import { UserList } from '../user/UserList';
import { GroupList } from '../group/GroupList';

export interface HomeProps {
  auth: Auth0Authentication;
}
export class Home extends Component<HomeProps, {}> {
  @autobind
  login() {
    this.props.auth.login();
  }

  @autobind
  logout() {
    this.props.auth.logout();
  }

  render() {
    return (
      <div style={{ padding: 20 }}>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Paper>
              <UserList name="CurrentUser" />
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <GroupList />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
