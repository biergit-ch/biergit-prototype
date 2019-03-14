import { combineReducers } from "redux";
import { ADD_GROUP, ADD_USER } from 'src/actions/actionTypes';

function userGroups(state = [], action: any) {
  switch (action.type) {
    case ADD_GROUP:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case ADD_USER:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    default:
      return state;
  }
}

export const rootReducers = combineReducers({
    userGroups
});


