import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import filters from "../reduxSlices/filtersSlice";
import heroes from "../reduxSlices/heroesSlice";

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

// reducer && store
const store = configureStore({
  reducer: {
    filters,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  preloadedState: undefined,
  devTools: process.env.NODE_ENV !== "production",
  enhancers: [loggerEnhancer]
})

export default store;