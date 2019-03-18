import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from './../middleware';
import thunk from 'redux-thunk';
import { rootReducer, AppState } from './../reducers';

export function configureStore(): Store<AppState> {
  let middleware = applyMiddleware(logger, thunk);

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(middleware);
  }

  const store = createStore(rootReducer as any, middleware) as Store<AppState>;

  return store;
}
