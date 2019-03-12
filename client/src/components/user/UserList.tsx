import * as React from 'react';

interface UserListProps {
  name: string;
}

export class UserList extends React.Component<UserListProps> {
  render() {
    return (
      <div>
        <h1>UserList</h1>
        <h3>Hello, {this.props.name}</h3>
      </div>
      );
  }
}
