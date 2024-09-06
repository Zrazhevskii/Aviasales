import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { headerState } from '../interfase/headerinterface';

const initialState: headerState = {
    choiceHeader: [
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

const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        changeStatusHeaderElem: (state, { payload }: PayloadAction<number>) => {
            state.choiceHeader = state.choiceHeader.map((item) => {
                if (item.id === payload) {
                    item.status = !item.status;
                } else {
                    item.status = false;
                }
                return item;
            });
        },
    },
});

export const { changeStatusHeaderElem } = HeaderSlice.actions;
export default HeaderSlice.reducer;
