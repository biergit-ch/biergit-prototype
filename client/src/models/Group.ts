import { IUser } from './User';

export interface IGroup {
  _id: string;
  groupName: string;
  owner: IUser;
  members: Array<IUser>;
}

export class Group implements IGroup {
  _id: string;
  groupName: string;
  owner: any;
  members: Array<IUser>;

  constructor(groupName: string, owner: IUser, members: Array<IUser>) {
    this.groupName = groupName;
    this.owner = owner;
    this.members = members;
  }
}
