import { createSlice } from '@reduxjs/toolkit';

interface BoardSlice {}

const initialState: BoardSlice = {};

export const boardSlice = createSlice({
  name: 'boardState',
  initialState,
  reducers: {},
});

export default boardSlice.reducer;
