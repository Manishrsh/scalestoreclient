import { configureStore } from '@reduxjs/toolkit';
import userroleReducer from '../slices/userroleslice.js';
import authReducer from '../slices/authSlice.js'; 
import inqProductReducer from '../slices/inqProducts.js'; 

const store = configureStore({
  reducer: {
    userRole: userroleReducer,
    auth: authReducer, 
    inqProduct: inqProductReducer,
  },
});

export default store;
