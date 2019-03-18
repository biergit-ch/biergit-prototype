import * as React from 'react';
import { IUser } from 'src/models';

interface UserProps {
  user: IUser;
}

export class UserDetail extends React.Component<UserProps> {
  render() {
    return (
      <li style={{ padding: '10px' }}>
        <span style={{ color: 'gray' }}> id: </span> {this.props.user._id}{' '}
        <br />
        <span style={{ color: 'gray' }}> name: </span>
        {this.props.user.userName}
      </li>
    );
  }
}
