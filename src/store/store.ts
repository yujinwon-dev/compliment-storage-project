import { configureStore } from "@reduxjs/toolkit";
import complimentReducer from './modules/compliment';

export const store = configureStore({
  reducer: {
    compliment: complimentReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
