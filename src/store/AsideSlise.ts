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

const AsideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        toggleStatus: (state, { payload }: PayloadAction<number>) => {
            if (state.choiceList[0].status === true) {
                state.choiceList[0].status = false;
            }
            const toggleElem = state.choiceList.find((item) => item.id === payload);
            if (toggleElem) {
                toggleElem.status = !toggleElem.status;
            }
        },

        toggleAllItemStatus: (state) => {
            if (state.choiceList[0].status === true) {
                state.choiceList.forEach((item) => {
                    item.status = false;
                });
            } else {
                state.choiceList.forEach((item) => {
                    item.status = true;
                });
            }
        },
    },
});

export const { toggleStatus, toggleAllItemStatus } = AsideSlice.actions;
export default AsideSlice.reducer;
