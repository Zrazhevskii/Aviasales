import { configureStore } from '@reduxjs/toolkit';
import AsideSlice from './AsideSlise';
import HeaderSlice from './HeaderSlice';

const store = configureStore({
    reducer: {
        aside: AsideSlice,
        header: HeaderSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
