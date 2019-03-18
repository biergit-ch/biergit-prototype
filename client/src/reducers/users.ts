import { handleActions } from "redux-actions";
import { RootState, IUserState } from "./state";
import { UserActions } from "./../actions";
import { IUser } from "src/models";

const initialState: IUserState = {
  state: "INIT",
  users: []
};

export const userReducer = handleActions<IUserState, IUser>(
  {
    [UserActions.Type.FETCH_USERS]: (
      state,
      action: UserActions.IActionUsersFetch
    ) => {
      return state;
    },
    [UserActions.Type.FETCH_USERS_SUCCESS]: (
      state: RootState.UserState,
      action: UserActions.IActionUsersFetchSuccess
    ) => {
      if (action.users != null) {
        return Object.assign({}, state, {
          state: "LOADED",
          users: action.users
        })
      }
      return state;
    },
    [UserActions.Type.ADD_USER]: (state : any, action) => {
      debugger;
      if (action.payload && action.payload._id) {
        let user = action.payload;
        return Object.assign({}, state, {
          state: "LOADED",
          users: [...state.users, user]
        })
      }
      return state;
    },
    [UserActions.Type.DELETE_USER]: (state: any, action) => {
      return state.users.filter((user: any) => user._id !== (action.payload as any));
    },
    [UserActions.Type.EDIT_USER]: (state: any, action) => {
      return state.users.map((user: any) => {
        if (!user || !action || !action.payload) {
          return user;
        }
        return (user._id || 0) === action.payload._id
          ? {
              ...user,
              userName: action.payload.userName,
              nickName: action.payload.nickName
            }
          : user;
      });
    }
  },
  initialState
);
