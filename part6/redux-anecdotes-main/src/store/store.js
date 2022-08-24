import anecdoteReducer from './reducers/anecdoteReducer';
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from './reducers/notificationReducer';

const reducer = {
  anecdote: anecdoteReducer,
  notification: notificationReducer,
}

export const store = configureStore({reducer});
