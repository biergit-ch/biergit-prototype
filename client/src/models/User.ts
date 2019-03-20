/** User model definitions **/

export interface IUser {
  _id: string;
  userName: string;
  nickName: string;
  email: string;
  pictureUrl: string;
}

export class User implements IUser {
  _id: string;
  userName: string;
  nickName: string;
  email: string;
  pictureUrl: string;

  constructor(userName?: string, nickName?: string, email?: string, pictureUrl?: string) {
    this.userName = userName || '';
    this.nickName = nickName || '';
    this.email = email || '';
    this.pictureUrl = pictureUrl || '';
  }
}
