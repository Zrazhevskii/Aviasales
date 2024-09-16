import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketsState } from '../interfase/tucketsInterface';
import { getSearchId, getTickets } from '../servises/TicketsApi';

const initialState: TicketsState = {
    tickets: [],
    loading: false,
    error: false,
    showMoreTickets: 5,
    noResult: false,
    isSearchId: '',
    stop: false,
};

const TicketSlice = createSlice({
    name: 'aviatickets',
    initialState,
    reducers: {
        sortPriceTicket: (state) => {
            state.tickets = state.tickets.sort((a, b) => (a.price > b.price ? 1 : -1));
        },
        noResultTickets: (state, { payload }: PayloadAction<boolean>) => {
            state.noResult = payload;
        },
        toggleStop: (state, { payload }: PayloadAction<boolean>) => {
            state.stop = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchId.fulfilled, (state, { payload }) => {
                state.isSearchId = payload;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.loading = false;
                    if (payload.stop) {
                        state.stop = true;
                    } else {
                        state.tickets = [...state.tickets, ...payload.tickets];
                    }
                }
            })
            .addCase(getSearchId.rejected, (state) => {
                state.error = true;
            })
            .addCase(getTickets.rejected, (state) => {
                state.error = true;
                state.loading = false;
            });
    },
});

export const { sortPriceTicket, noResultTickets, toggleStop } = TicketSlice.actions;
export default TicketSlice.reducer;
