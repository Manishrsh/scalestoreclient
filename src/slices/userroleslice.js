import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: 'customer', // Corrected typo from 'consromer' to 'customer'
};

export const userroleSlice = createSlice({
  name: 'userRole',
  initialState,
  reducers: {
    updaterole: (state, action) => {
      state.role = action.payload;
    }
  },
});

export const { updaterole } = userroleSlice.actions;

export default userroleSlice.reducer;
