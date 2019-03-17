import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserModel } from 'src/models';
import { UserActions } from 'src/actions';

const initialState: RootState.UserState = [
  {
    _id: "newId",
    userName: 'new User',
    nickName: 'nickname'
  }
];

export const userReducer = handleActions<RootState.UserState, UserModel>(
  {
    [UserActions.Type.ADD_USER]: (state, action) => {
      if (action.payload && action.payload.userName) {
        return [
          {
            _id: action.payload._id,
            userName: action.payload.userName,
            nickName: action.payload.nickName
          },
          ...state
        ];
      }
      return state;
    },
    [UserActions.Type.DELETE_USER]: (state, action) => {
      return state.filter(user => user._id !== (action.payload as any));
    },
    [UserActions.Type.EDIT_USER]: (state, action) => {
      return state.map(user => {
        if (!user || !action || !action.payload) {
          return user;
        }
        return (user._id || 0) === action.payload._id
          ? { ...user, userName: action.payload.userName, nickName: action.payload.nickName }
          : user;
      });
    },
  },
  initialState
);
