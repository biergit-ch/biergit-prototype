/** User model definitions **/

export interface IUser {
  _id: string;
  userName: string;
  nickName: string;
  email: string;
}

export class User implements IUser {
  _id: string;
  userName: string;
  nickName: string;
  email: string;

  constructor(userName?: string, nickName?: string, email?: string) {
    this.userName = userName || '';
    this.nickName = nickName || '';
    this.email = email || '';
  }
}
