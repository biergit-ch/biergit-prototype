import { combineReducers } from "redux";
import { userReducer } from "./users";
import { groupReducer } from "./groups";

export const rootReducer = combineReducers({
  users: userReducer,
  groups: groupReducer
});

export type AppState = ReturnType<typeof rootReducer>;
