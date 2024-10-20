import { createSlice } from '@reduxjs/toolkit';

type BoardSlice = object;

const initialState: BoardSlice = {};

export const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
