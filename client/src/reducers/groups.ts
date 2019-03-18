import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { GroupActions } from './../actions';
import { IGroup, IUser, User } from './../models';
import UUIDV4 from './../utils/UUID';

const initialState: RootState.GroupState = [
  {
    _id: UUIDV4(),
    groupName: 'new Group',
    members: new Array<IUser>(),
    owner: new User()
  }
];

export const groupReducer = handleActions<RootState.GroupState, IGroup>(
  {
    [GroupActions.Type.FETCH_GROUPS]: (state, action) => {
      return state;
    },
    [GroupActions.Type.FETCH_GROUPS_SUCCESS]: (state, action: GroupActions.IActionGroupsFetchSuccess) => {
      return state;
    },
    [GroupActions.Type.ADD_GROUP]: (state, action) => {
      if (action.payload && action.payload.groupName) {
        return [
          {
            _id: action.payload._id,
            groupName: action.payload.groupName,
            owner: action.payload.owner,
            members: action.payload.members
          },
          ...state
        ];
      }
      return state;
    },
    [GroupActions.Type.EDIT_GROUP]: (state, action) => {
      return state.map(group => {
        if (!group || !action || !action.payload) {
          return group;
        }
        return (group._id || 0) === action.payload._id
          ? {
              ...group
            }
          : group;
      });
    }
  },
  initialState
);
