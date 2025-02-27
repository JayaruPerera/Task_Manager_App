import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;  //The Redux store holds the entire state of your application. This state can be accessed using the getState() method of the store.
export type AppDispatch = typeof store.dispatch;    //get the type of the dispatch method of the Redux store.
