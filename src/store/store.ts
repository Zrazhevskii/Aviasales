import { configureStore } from '@reduxjs/toolkit';
import AsideSlice from './AsideSlise';
import HeaderSlice from './HeaderSlice';
import TicketsSlice from './TicketsSlice';

const store = configureStore({
    reducer: {
        aside: AsideSlice,
        header: HeaderSlice,
        aviTickets: TicketsSlice,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
