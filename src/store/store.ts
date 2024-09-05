import { configureStore } from '@reduxjs/toolkit';
import asideSlice from './AsideSlise';

const store = configureStore({
    reducer: {
        aside: asideSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
