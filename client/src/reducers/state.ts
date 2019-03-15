import { UserModel, GroupModel } from 'src/models';

export interface RootState {
  groups: RootState.GroupState;
  users: RootState.UserState;
  router?: any;
}

export namespace RootState {
  export type UserState = UserModel[];
  export type GroupState = GroupModel[];
}
