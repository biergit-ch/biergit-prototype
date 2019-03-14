import { ADD_USER, ADD_GROUP, OPEN_USER_DIALOG } from "./actionTypes";

let nextTodoId = 0;

export const openUserDialog = (open: boolean) => ({
  type: OPEN_USER_DIALOG,
  payload: { open }
});

export const addUser = (content: any) => ({
  type: ADD_USER,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const addGroup = (id: string) => ({
  type: ADD_GROUP,
  payload: { id }
});
