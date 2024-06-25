import { createSlice } from "@reduxjs/toolkit";

export const navSlice = createSlice({
  name: 'nav',
  initialState: {
    value: "home",
  },
  reducers: {
    setNav: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { setNav } = navSlice.actions;
export default navSlice.reducer;
