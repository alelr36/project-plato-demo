import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'

import users from '../components/Users/reducer';
import tasks from '../components/Tasks/reducer';

const reducer = combineReducers({
  users,
  tasks,
})

const store = configureStore({
  reducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;