// This is the place The Globle State[Store(React redux tool)] place.
// this is help to handle states proper way.

import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./features/uiSlice";
import { api } from "./quary";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
