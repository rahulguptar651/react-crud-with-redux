import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData = createAsyncThunk('users/fetchData', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Create slice for users
export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    deleteUser: (state, action) => {
      let id = action.payload;
      const filterData = state.users.filter((item) => (
        item.id != id
      ))
      state.users = filterData;
    },
    updateUser: (state, action) => {
      const findUserIndex = state.users.findIndex((user) => user.id === action.payload.id)
      state.users[findUserIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export action creators
export const { addUser, deleteUser, updateUser } = usersSlice.actions;

// Export reducer
export default usersSlice.reducer;
