import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import logger from 'redux-logger';

import timerSlice from '@store/basicTimerSlice';

const rootReducer = combineReducers({ timer: timerSlice });

const middleWare: Middleware[] = [];

if (process.env.EXPO_PUBLIC_DEBUG_MODE) {
  middleWare.push(logger);
}

const redux = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
  devTools: process.env.EXPO_PUBLIC_DEBUG_MODE,
});

export type RootState = ReturnType<typeof redux.getState>;
export const useAppDispatch = () => useDispatch<typeof redux.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default redux;
