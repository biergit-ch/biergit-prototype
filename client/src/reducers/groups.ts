import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { GroupModel } from 'src/models';
import { GroupActions } from 'src/actions';

const initialState: RootState.GroupState = [
  {
    id: 1,
    groupname: 'new User',
    members: []
  }
];

export const groupReducer = handleActions<RootState.GroupState, GroupModel>(
  {
    [GroupActions.Type.ADD_GROUP]: (state, action) => {
      if (action.payload && action.payload.groupname) {
        return [
          {
            id:
              state.reduce((max, group) => Math.max(group.id || 1, max), 0) + 1,
            groupname: action.payload.groupname,
            members: action.payload.members
          },
          ...state
        ];
      }
      return state;
    },
    [GroupActions.Type.DELETE_GROUP]: (state, action) => {
      return state.filter(group => group.id !== (action.payload as any));
    },
    [GroupActions.Type.EDIT_GROUP]: (state, action) => {
      return state.map(group => {
        if (!group || !action || !action.payload) {
          return group;
        }
        return (group.id || 0) === action.payload.id
          ? {
              ...group,
              groupname: action.payload.groupname,
              members: action.payload.members
            }
          : group;
      });
    }
  },
  initialState
);
