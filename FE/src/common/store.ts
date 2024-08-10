import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardSlice from '../pages/kanban-board/action/boardSlice';
import splitApi from 'common/api/apiBaseQuery';
import commonSlice from 'common/commonSlice';

export const store = configureStore({
  reducer: {
    [splitApi.reducerPath]: splitApi.reducer, // add Reducer from apiBaseQuery,
    commonState: commonSlice,
    boardState: boardSlice,
  },
  // GetDefaultMiddleware and add Middleware from apiBaseQuery
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(splitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
