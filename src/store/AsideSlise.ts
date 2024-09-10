import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { asideState } from '../interfase/asideInterface';

const initialState: asideState = {
    choiceList: [
        {
            id: 1,
            title: 'Все',
            status: true,
        },
        {
            id: 2,
            title: 'Без пересадок',
            status: true,
        },
        {
            id: 3,
            title: '1 пересадка',
            status: true,
        },
        {
            id: 4,
            title: '2 пересадки',
            status: true,
        },
        {
            id: 5,
            title: '3 пересадки',
            status: true,
        },
    ],
};

const AsideSlice = createSlice({
    name: 'aside',
    initialState,
    reducers: {
        toggleStatus: (state, { payload }: PayloadAction<number>) => {
            const toggleElem = state.choiceList.find((item) => item.id === payload);
            if (toggleElem) {
                toggleElem.status = !toggleElem.status;
            }

            if (state.choiceList[0].status === true) {
                state.choiceList[0].status = false;
            }

            const firstStatus = state.choiceList.slice(1).find((i) => i.status === state.choiceList[0].status);

            if (firstStatus === undefined) {
                state.choiceList[0].status = true;
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
