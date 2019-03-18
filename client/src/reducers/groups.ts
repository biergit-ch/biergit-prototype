import { handleActions } from "redux-actions";
import { IGroupState } from "./state";
import { GroupActions } from "./../actions";
import { IGroup } from "./../models";

const initialState: IGroupState = {
  groups: [],
  state: "INIT"
};

export const groupReducer = handleActions<IGroupState, IGroup>(
  {
    [GroupActions.Type.FETCH_GROUPS]: (state, action) => {
      return state;
    },
    [GroupActions.Type.FETCH_GROUPS_SUCCESS]: (
      state: IGroupState,
      action: GroupActions.IActionGroupsFetchSuccess
    ) => {
      if (action.groups != null && action.groups.length > 0) {
        return Object.assign({}, state, {
          state: "LOADED",
          groups: action.groups
        })
      }
      return state;
    },
    [GroupActions.Type.ADD_GROUP]: (state: any, action) => {
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
    [GroupActions.Type.EDIT_GROUP]: (state: any, action) => {
      return state.groups.map((group: any) => {
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
