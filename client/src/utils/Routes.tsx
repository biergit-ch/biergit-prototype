import * as React from 'react';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { Router } from 'react-router-dom';
import { App, Profile, Admin } from '../components';
import { Callback, Home } from '../components';
import { WebAuthentication } from './../auth/';
import history from './History';

const auth = new WebAuthentication();

const handleAuthentication = (props: RouteComponentProps<{}>) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const Routes: React.SFC<{}> = () => {
  const { authenticated, userHasScopes } = auth;
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={props => <App auth={auth} {...props} />} />
        <main role="main">
          <Route
            path="/home"
            render={props =>
              !authenticated ? (
                <Redirect to="/" />
              ) : (
                <Home auth={auth} {...props} />
              )
            }
          />
          <Route
            path="/profile"
            render={props =>
              !authenticated ? (
                <Redirect to="/" />
              ) : (
                <Profile auth={auth} {...props} />
              )
            }
          />
          <Route
            path="/admin"
            render={props =>
              !authenticated || !userHasScopes(['write:messages']) ? (
                <Redirect to="/" />
              ) : (
                <Admin auth={auth} {...props} />
              )
            }
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </main>
      </div>
    </Router>
  );
};
export default Routes;
