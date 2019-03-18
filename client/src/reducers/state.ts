import { IGroup, IUser } from 'src/models';

export interface RootState {
  groupState: string; // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  userState: string; // 'INIT', 'LOADING' | 'LOADED' | 'ERROR',
  groups: RootState.GroupState;
  users: RootState.UserState;
  router?: any;
}

export namespace RootState {
  export type UserState = IUser[];
  export type GroupState = IGroup[];
}
