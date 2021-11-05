import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import rootReducer from './reducres'

const initialState = {};

const middleware = [thunk]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store
