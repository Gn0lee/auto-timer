import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import timerSlice from '@store/basicTimerSlice';
import motionTimerSlice from '@store/motionTimerSlice';

const rootReducer = combineReducers({ timer: timerSlice, motion: motionTimerSlice });

const middleWare: Middleware[] = [];

const redux = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWare),
});

export type RootState = ReturnType<typeof redux.getState>;
export const useAppDispatch = () => useDispatch<typeof redux.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default redux;
