import { configureStore } from "@reduxjs/toolkit";

import transactionSlice from "./transactionSlice";

const store = configureStore({
  reducer: {
    transaction: transactionSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
