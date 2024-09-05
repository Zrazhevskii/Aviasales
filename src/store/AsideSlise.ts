import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asideState } from '../interfase/asideInterface';

const initialState: asideState = {
    choiceList: [
        {
            id: 1,
            title: 'Все',
            status: false,
        },
        {
            id: 2,
            title: 'Без пересадок',
            status: false,
        },
        {
            id: 3,
            title: '1 пересадка',
            status: false,
        },
        {
            id: 4,
            title: '2 пересадки',
            status: false,
        },
        {
            id: 5,
            title: '3 пересадки',
            status: false,
        },
    ],
};

const asideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        toggleStatus: (state, { payload }: PayloadAction<number>) => {
            const toggleElem = state.choiceList.find((item) => item.id === payload);
            if (toggleElem) {
                toggleElem.status = !toggleElem.status;
            }
        },
    },
});

export const { toggleStatus } = asideSlice.actions;
export default asideSlice.reducer;
