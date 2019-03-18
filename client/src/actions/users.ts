import { createAction } from 'redux-actions';
import { Omit } from 'react-redux';
import { IUser } from './../models';
import { Action, Dispatch } from 'redux';
import UserService from 'src/services/user';

export namespace UserActions {
  export function isAction<A extends Action>(
    action: Action,
    type: string
  ): action is A {
    return action.type === type;
  }

  export interface IActionUsersFetch extends Action {
    type: 'FETCH_USERS';
  }

  export interface IActionUsersFetchSuccess extends Action {
    type: 'FETCH_USERS_SUCCESS';
    users: IUser[];
  }

  export interface IActionUsersFetchError extends Action {
    type: 'FETCH_USERS_ERROR';
    errorMessage: string;
  }

  export enum Type {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    ADD_USER = 'ADD_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
  }

  
  function dispatchFetchUsersProgress(): IActionUsersFetch {
    return {
      type: Type.FETCH_USERS
    };
  }

  function dispatchFetchUsersSuccess(
    users: IUser[]
  ): IActionUsersFetchSuccess {
    return {
      type: Type.FETCH_USERS_SUCCESS,
      users
    };
  }

  function dispatchFetchUsersError(e: Error): IActionUsersFetchError {
    return {
      type: Type.FETCH_USERS_ERROR,
      errorMessage: e.message
    };
  }

  export const actionFetchUsers = () => {
    return (dispatch: Dispatch) => {
      dispatch(dispatchFetchUsersProgress());
      return UserService.getAll()
        .then(users => {
          return dispatch(dispatchFetchUsersSuccess(users.data));
        })
        .catch((e: Error) => {
          return dispatch(dispatchFetchUsersError(e));
        });
    };
  };

  export const addUser = createAction<IUser>(Type.ADD_USER);
  export const editUser = createAction<PartialPick<IUser, '_id'>>(
    Type.EDIT_USER
  );
  export const deleteUser = createAction<IUser['_id']>(Type.DELETE_USER);
}

export type UserActions = Omit<typeof UserActions, 'Type'>;
