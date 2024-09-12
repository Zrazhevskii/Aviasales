import { createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { TicketItem, TicketsState } from '../interfase/tucketsInterface';
import { getSearchId, getTickets } from '../servises/TicketsApi';

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}

const initialState: TicketsState = {
    tickets: [],
    copyTickets: [],
    loading: false,
    error: false,
    showMoreTickets: 5,
    noResult: false,
    isSearchId: false,
    stop: false,
};

const TicketSlice = createSlice({
    name: 'aviatickets',
    initialState,
    reducers: {
        addCopyTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload;
        },
        moreTickets: (state) => {
            state.showMoreTickets += 5;
        },
        addMoreTickets: (state) => {
            state.showMoreTickets = 5;
        },
        sortPriceTicket: (state) => {
            state.tickets = state.tickets.sort((a, b) => (a.price > b.price ? 1 : -1));
        },
        sortPriceCopyTicket: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload;
            state.copyTickets = state.copyTickets.sort((a, b) => (a.price > b.price ? 1 : -1));
        },
        sortSpeedCopyTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload.sort((a, b) => {
                const sortedA = a.segments.reduce((acc, i) => acc + i.duration, 0);
                const sortedB = b.segments.reduce((acc, i) => acc + i.duration, 0);
                return sortedA > sortedB ? 1 : -1;
            });
        },
        sortOptimalCopyTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload.sort((a, b) => {
                const optimalA = a.segments.reduce((acc, i) => acc + i.duration, 0) + a.price;
                const optimalB = b.segments.reduce((acc, i) => acc + i.duration, 0) + b.price;
                return optimalA > optimalB ? 1 : -1;
            });
        },
        noResultTickets: (state, { payload }: PayloadAction<boolean>) => {
            state.noResult = payload;
        },
        toggleIsSearchId: (state) => {
            state.isSearchId = !state.isSearchId;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSearchId.fulfilled, (state) => {
                state.isSearchId = true;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                if (payload.stop) {
                    state.loading = false;
                    state.stop = true;
                }
                state.loading = false;
                state.tickets = [...state.tickets, ...payload.tickets];
                state.copyTickets = [...state.tickets, ...payload.tickets];
            })
            .addMatcher(isError, (state, { payload }: PayloadAction<boolean>) => {
                state.error = payload;
                state.loading = false;
            });
    },
});

export const {
    addMoreTickets,
    addCopyTickets,
    moreTickets,
    sortPriceTicket,
    sortOptimalCopyTickets,
    noResultTickets,
    sortPriceCopyTicket,
    toggleIsSearchId,
    sortSpeedCopyTickets,
} = TicketSlice.actions;

export default TicketSlice.reducer;
