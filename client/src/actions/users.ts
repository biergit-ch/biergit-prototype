import { createAction } from 'redux-actions';
import { UserModel } from 'src/models';
import { Omit } from 'react-redux';

export namespace UserActions {
  export enum Type {
    ADD_USER = 'ADD_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
  }

  export const addUser = createAction<UserModel>(Type.ADD_USER);
  export const editUser = createAction<PartialPick<UserModel, 'id'>>(
    Type.EDIT_USER
  );
  export const deleteUser = createAction<UserModel['id']>(Type.DELETE_USER);
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
