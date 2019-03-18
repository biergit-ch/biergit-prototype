import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserActions } from './../actions';
import { IUser } from './../models';
import UUIDV4 from './../utils/UUID';

const initialState: RootState.UserState = [
  {
    _id: UUIDV4(),
    userName: 'new User',
    nickName: 'nickname',
    email: 'email'
  }
];

export const userReducer = handleActions<RootState.UserState, IUser>(
  {
    [UserActions.Type.ADD_USER]: (state, action) => {
      if (action.payload && action.payload.userName) {
        return [
          {
            _id: action.payload._id,
            userName: action.payload.userName,
            nickName: action.payload.nickName,
            email: action.payload.email
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
