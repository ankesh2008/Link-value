import { configureStore } from '@reduxjs/toolkit';
import { appReducer, persistResourcesMiddleware } from './appSlice';

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistResourcesMiddleware)
});
