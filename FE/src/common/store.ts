import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import boardSlice from '../pages/kanban-board/action/boardSlice';
import baseApi from 'common/api/apiBaseQuery';
import commonSlice from 'common/commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { RESET_ALL } from './constants/commonConst';

const combineReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer, // add Reducer from apiBaseQuery,
  commonState: commonSlice,
  boardState: boardSlice,
});

const rootReducer = (state: any, action: any) => {
  if (RESET_ALL === action.type) {
    const { commonState } = state;

    const resetCommonState = {
      ...commonState,
      isLogin: false,
      loginData: undefined,
    };

    state = {
      commonState: resetCommonState,
    };
  }
  return combineReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: gDM => gDM().concat([baseApi.middleware]), // GetDefaultMiddleware and add Middleware from apiBaseQuery
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
