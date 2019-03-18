import { IGroup, IUser } from "src/models";

export interface RootState {
  router?: any;
}

export interface IUserState {
  users: IUser[];
  state: string;
}

export interface IGroupState {
  groups: IGroup[];
  state: string;
}

export namespace RootState {
  export type UserState = IUserState;
  export type GroupState = IGroupState;
}
