import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { headerState } from '../interfase/headerinterface';

const initialState: headerState = {
    ticketAggregate: [
        {
            id: 1,
            title: 'САМЫЙ ДЕШЕВЫЙ',
            status: true,
        },
        {
            id: 2,
            title: 'САМЫЙ БЫСТРЫЙ',
            status: false,
        },
        {
            id: 3,
            title: 'САМЫЙ ДЕШЕВЫЙ',
            status: false,
        },
    ],
};

const headerSlice = createSlice({
    name: 'ticketAggregate',
    initialState,
    reducers: {
        changeStatusHeaderElem: (state, { payload }: PayloadAction<number>) => {
            const activeElement = state.ticketAggregate.find((item) => item.id === payload);
            if (activeElement) {
                activeElement.status = !activeElement.status;
            }
        },
    },
});

export const { changeStatusHeaderElem } = headerSlice.actions;
export default headerSlice.reducer;
