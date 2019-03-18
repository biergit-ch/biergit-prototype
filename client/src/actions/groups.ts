import { createAction } from 'redux-actions';
import { IGroup } from 'src/models';
import { Dispatch, Action } from 'redux';
import GroupService from 'src/services/group';

export namespace GroupActions {
  export function isAction<A extends Action>(
    action: Action,
    type: string
  ): action is A {
    return action.type === type;
  }

  export interface IActionGroupsFetch extends Action {
    type: 'FETCH_GROUPS';
  }

  export interface IActionGroupsFetchSuccess extends Action {
    type: 'FETCH_GROUPS_SUCCESS';
    groups: IGroup[];
  }

  export interface IActionGroupsFetchError extends Action {
    type: 'FETCH_GROUPS_ERROR';
    errorMessage: string;
  }

  export enum Type {
    FETCH_GROUPS = 'FETCH_GROUPS',
    FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS',
    FETCH_GROUPS_ERROR = 'FETCH_GROUPS_ERROR',
    ADD_GROUP = 'ADD_GROUP',
    EDIT_GROUP = 'EDIT_GROUP',
    DELETE_GROUP = 'DELETE_GROUP'
  }

  function dispatchFetchGroupsProgress(): IActionGroupsFetch {
    return {
      type: Type.FETCH_GROUPS
    };
  }

  function dispatchFetchGroupsSuccess(
    groups: IGroup[]
  ): IActionGroupsFetchSuccess {
    return {
      type: Type.FETCH_GROUPS_SUCCESS,
      groups
    };
  }

  function dispatchFetchGroupsError(e: Error): IActionGroupsFetchError {
    return {
      type: Type.FETCH_GROUPS_ERROR,
      errorMessage: e.message
    };
  }

  export const actionFetchGroups = () => {
    return (dispatch: Dispatch) => {
      dispatch(dispatchFetchGroupsProgress());
      return GroupService.getAll()
        .then(groups => {
          return dispatch(dispatchFetchGroupsSuccess(groups.data));
        })
        .catch((e: Error) => {
          return dispatch(dispatchFetchGroupsError(e));
        });
    };
  };
  export const addGroup = createAction<IGroup>(Type.ADD_GROUP);
  export const editGroup = createAction<PartialPick<IGroup, '_id'>>(
    Type.EDIT_GROUP
  );
  export const deleteGroup = createAction<IGroup['_id']>(Type.DELETE_GROUP);
}

export type GroupActions = Omit<typeof GroupActions, 'Type'>;
