import * as React from 'react';
import { UserModel } from 'src/models';

interface UserProps {
  user: UserModel;
}

export class User extends React.Component<UserProps> {
  render() {
    return <li key={this.props.user.id}>{this.props.user.username}</li>;
  }
}
