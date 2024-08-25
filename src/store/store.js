import { configureStore } from '@reduxjs/toolkit';
import userroleReducer from '../slices/userroleslice.js'; // Adjust the path based on your project structure

const store = configureStore({
  reducer: {
    userRole: userroleReducer, // Combine your reducer here
  },
});

export default store;
