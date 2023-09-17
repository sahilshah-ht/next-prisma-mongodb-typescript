import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { uiReducer } from '.';


const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export * from './ui';

export default store;
