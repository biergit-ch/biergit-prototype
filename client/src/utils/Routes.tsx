import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { Profile, Admin, Welcome } from '../components';
import { Callback, Home } from '../components';
import { Auth0Authentication } from 'src/auth/Auth0Authentication';

export interface RouterProps {
  auth: Auth0Authentication;
}

export class Routes extends React.Component<RouterProps> {
  constructor(props: RouterProps) {
    super(props);
  }
  handleAuthentication() {
    if (/access_token|id_token|error/.test(location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }
  render() {
    const { authenticated, userHasScopes } = this.props.auth;
    return (
      <div>
        <main role="main">
          <Route path="/" render={() => <Welcome />} />
          <Route
            path="/home"
            render={props =>
              !authenticated ? (
                <Redirect to="/" />
              ) : (
                <Home auth={this.props.auth} {...props} />
              )
            }
          />
          <Route
            path="/profile"
            render={props =>
              !authenticated ? (
                <Redirect to="/" />
              ) : (
                <Profile auth={this.props.auth} {...props} />
              )
            }
          />
          <Route
            path="/admin"
            render={props =>
              !authenticated || !userHasScopes(['write:messages']) ? (
                <Redirect to="/" />
              ) : (
                <Admin auth={this.props.auth} {...props} />
              )
            }
          />
          <Route
            path="/callback"
            render={props => {
              this.handleAuthentication();
              return <Callback {...props} />;
            }}
          />
        </main>
      </div>
    );
  }
}
