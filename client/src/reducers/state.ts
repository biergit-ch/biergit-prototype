import { IGroup, IUser } from 'src/models';

export interface RootState {
  groups: RootState.GroupState;
  users: RootState.UserState;
  router?: any;
}

export namespace RootState {
  export type UserState = IUser[];
  export type GroupState = IGroup[];
}
