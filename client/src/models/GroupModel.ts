import { User } from 'src/components/user/User';

export interface GroupModel {
  id: number;
  groupname: string;
  members: Array<User>;
}
