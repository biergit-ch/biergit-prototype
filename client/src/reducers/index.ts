import { combineReducers } from 'redux';
import { RootState } from './state';
import { userReducer } from './users';
import { groupReducer } from './groups';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  users: userReducer as any,
  groups: groupReducer as any
});
