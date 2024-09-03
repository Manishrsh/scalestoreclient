import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productid: null, // Initialize with null or empty string to avoid undefined errors
};

export const inqProductSlice = createSlice({
  name: 'inqproductclient',
  initialState,
  reducers: {
    updateinqproduct: (state, action) => {
      state.productid = action.payload;
    }
  },
});

export const { updateinqproduct } = inqProductSlice.actions;

export default inqProductSlice.reducer;
