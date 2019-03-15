import { GroupModel } from 'src/models';
import { createAction } from 'redux-actions';

export namespace GroupActions {
  export enum Type {
    ADD_GROUP = 'ADD_GROUP',
    EDIT_GROUP = 'EDIT_GROUP',
    DELETE_GROUP = 'DELETE_GROUP'
  }

  export const addGroup = createAction<GroupModel>(Type.ADD_GROUP);
  export const editGroup = createAction<PartialPick<GroupModel, 'id'>>(
    Type.EDIT_GROUP
  );
  export const deleteGroup = createAction<GroupModel['id']>(Type.DELETE_GROUP);
}

export type GroupActions = Omit<typeof GroupActions, 'Type'>;
