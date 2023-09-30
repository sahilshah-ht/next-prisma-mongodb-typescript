import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { uiReducer } from '.';
import { api } from './api/ServerApi';
import { rtkQueryErrorLogger, rtkQuerySuccessHandler } from './api/rtkQueryLogger';
import { setupListeners } from '@reduxjs/toolkit/dist/query';


const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        ui: uiReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([api.middleware, rtkQueryErrorLogger,rtkQuerySuccessHandler]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
setupListeners(store.dispatch);

export * from './ui';

export default store;
