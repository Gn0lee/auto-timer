import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import timerSlice from '@store/timerSlice';

const rootReducer = combineReducers({ timer: timerSlice });

const redux = configureStore({ reducer: rootReducer });

type RootState = ReturnType<typeof redux.getState>;
export const useAppDispatch = () => useDispatch<typeof redux.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default redux;
