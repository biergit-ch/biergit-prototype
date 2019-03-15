import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserModel } from 'src/models';
import { UserActions } from 'src/actions';

const initialState: RootState.UserState = [
  {
    id: 1,
    username: 'new User',
    nickname: 'nickname'
  }
];

export const userReducer = handleActions<RootState.UserState, UserModel>(
  {
    [UserActions.Type.ADD_USER]: (state, action) => {
      if (action.payload && action.payload.username) {
        return [
          {
            id: state.reduce((max, user) => Math.max(user.id || 1, max), 0) + 1,
            username: action.payload.username,
            nickname: action.payload.nickname
          },
          ...state
        ];
      }
      return state;
    },
    [UserActions.Type.DELETE_USER]: (state, action) => {
      return state.filter(user => user.id !== (action.payload as any));
    },
    [UserActions.Type.EDIT_USER]: (state, action) => {
      return state.map(user => {
        if (!user || !action || !action.payload) {
          return user;
        }
        return (user.id || 0) === action.payload.id
          ? { ...user, username: action.payload.username, nickname: action.payload.nickname }
          : user;
      });
    },
  },
  initialState
);
