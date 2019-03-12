import * as React from 'react';

interface UserListProps {
  name: string;
}

export class UserList extends React.Component<UserListProps> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
