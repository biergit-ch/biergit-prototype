import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UserActions } from './../actions';
import UUIDV4 from './../utils/UUID';
import { IUser } from 'src/models';

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
    [UserActions.Type.FETCH_USERS]: (state, action: UserActions.IActionUsersFetch) => {
      return state;
    },
    [UserActions.Type.FETCH_USERS_SUCCESS]: (state: any, action: UserActions.IActionUsersFetchSuccess) => {
      debugger;
      if(action.users != null && action.users.length > 0){
        action.users.map(user => state.push(user))
        return state;
      }
      return state;
    },
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
