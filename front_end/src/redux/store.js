import { configureStore } from '@reduxjs/toolkit';
import visitedNewsReducer from './visitedNewsSlice';

export const store = configureStore({
  reducer: {
    visitedNews: visitedNewsReducer,
  },
});
