import User from 'src/user/user.interface';

interface Group {
  _id: string;
  groupName: string;
  owner: User;
  members: User[];
}

export default Group;
