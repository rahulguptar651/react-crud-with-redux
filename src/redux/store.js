import { configureStore } from "@reduxjs/toolkit";
import usersReducer, { fetchData } from "./tableSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
})

store.dispatch(fetchData());

export default store;