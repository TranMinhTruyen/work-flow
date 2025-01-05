import { createSlice } from '@reduxjs/toolkit';

type BoardSlice = object;

const initialState: BoardSlice = {};

const kanbanSlice = createSlice({
  name: 'kanbanState',
  initialState,
  reducers: {},
});

export default kanbanSlice.reducer;
