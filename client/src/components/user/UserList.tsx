import * as React from 'react';
import { UserModel } from 'src/models';
import axios, { AxiosResponse } from 'axios';
import { User } from './User';

interface UserListProps {
  name: string;
}

interface IState {
  userList: Array<UserModel>;
}

export class UserList extends React.Component<UserListProps> {
  state: IState;
  userList: Array<UserModel>;

  constructor(props: UserListProps) {
    super(props);
    this.state = { userList: new Array<UserModel>() };
  }

  public componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get<AxiosResponse>(process.env.REACT_APP_HEROKU_API_URL + '/api/users')
      .then(res => this.setState({ userList: res.data.data }));
  }

  render() {
    return (
      <div>
        <h1>UserList</h1>
        <h3>Hello, {this.props.name}</h3>
        <h4>Below a list of all users</h4>
        <ul>
          {this.state.userList.length <= 0
            ? 'no users loaded'
            : this.state.userList.map(user => <User user={user} />)}
        </ul>
      </div>
    );
  }
}
