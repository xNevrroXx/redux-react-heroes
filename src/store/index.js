import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {configureStore} from "@reduxjs/toolkit";
import ReduxThunk from "redux-thunk";

// reduxSlices
// import heroes from "../reduxSlices/heroes";
// import filters from "../reduxSlices/filters";
import heroes from "../reduxSlices/heroesSlice";
import filters from "../reduxSlices/filtersSlice";

// via applyMiddleware
const loggerMiddleware = ({getState}) => dispatch => action => {
  console.log("will dispatch: ", action);
  const returnValue = dispatch(action);
  console.log("state after dispatch: ", getState());
  return returnValue;
}
const stringMiddleware = (store) => (dispatch) => (action) => {
  if(typeof action === "string") {
    return dispatch({
      type: action
    });
  }
  return dispatch(action);
}

//via compose
const loggerEnhancer = (createStore) => (...args) => {
  const store = createStore(...args);
  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    console.log("will dispatch: ", action);
    oldDispatch(action);
    console.log("state after dispatch: ", store.getState());
  }
  return store;
}
const stringEnhancer = (createStore) => (...args) => {
  const store = createStore(...args);
  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    if(typeof action === "string") {
      return oldDispatch({
        type: action
      });
    }
    return oldDispatch(action);
  }

  return store;
}
const composedEnhancers = compose(
  stringEnhancer,
  loggerEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const composedEnhancersMiddleware = compose(
  applyMiddleware(
    ReduxThunk,
    stringMiddleware,
    loggerMiddleware
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


// reducer && store
const rootReducer = combineReducers({heroes, filters});
const store2 = createStore(
  rootReducer,
  undefined,
  // composedEnhancers
  composedEnhancersMiddleware
);

// via configure store
const store = configureStore({
  reducer: {heroes, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  preloadedState: undefined,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [loggerEnhancer]
})

export default store;