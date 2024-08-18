import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardSlice from '../pages/kanban-board/action/boardSlice';
import baseApi from 'common/api/apiBaseQuery';
import commonSlice from 'common/commonSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // add Reducer from apiBaseQuery,
    commonState: commonSlice,
    boardState: boardSlice,
  },
  // GetDefaultMiddleware and add Middleware from apiBaseQuery
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
