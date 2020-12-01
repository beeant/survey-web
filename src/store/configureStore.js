// @flow

import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import combinedReducers from "../reducers";

const {
  REACT_APP_BASENAME,
} = process.env;

export const history = createBrowserHistory({basename: REACT_APP_BASENAME});

const middlewares = [thunk];

function configureStore(additionalMiddlewares: Array<any> = [] /*initialState = undefined*/) {
  let appliedMiddlewares;
  if (process.env.NODE_ENV !== 'production') {
    appliedMiddlewares = composeWithDevTools(
      applyMiddleware(
        ...middlewares,
        ...additionalMiddlewares,
        routerMiddleware(history),
      ),
    );
  } else {
    appliedMiddlewares = applyMiddleware(
      ...middlewares,
      ...additionalMiddlewares,
      routerMiddleware(history),
    );
  }
  const store = createStore(
    combinedReducers(history),
    appliedMiddlewares,
  );
  return store;
}

export default configureStore;
