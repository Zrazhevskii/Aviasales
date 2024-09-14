import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketItem, TicketsState } from '../interfase/tucketsInterface';
import { getSearchId, getTickets } from '../servises/TicketsApi';

const initialState: TicketsState = {
    tickets: [],
    copyTickets: [],
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
        // toggleIsSearchId: (state, { payload }: PayloadAction<string>) => {
        //     state.isSearchId = payload;
        // },
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
                console.log('я получаю id - ', payload);
                state.isSearchId = payload;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                console.log('Это payload, получаю массив билетов - ', payload);
                if (payload) {
                    if (payload.stop) {
                        console.log('я где stop true');
                        state.loading = false;
                        state.stop = true;
                    } else {
                        state.stop = false;
                        state.loading = false;
                        state.tickets = [...state.tickets, ...payload.tickets];
                        state.copyTickets = [...state.tickets, ...payload.tickets];
                    }
                }
            })
            .addCase(getSearchId.rejected, (state) => {
                state.error = true;
            })
            .addCase(getTickets.rejected, (state, { payload }) => {
                console.log('это получаемая ошибка - ', payload);
                state.error = true;
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
    // toggleIsSearchId,
    sortSpeedCopyTickets,
    toggleStop,
} = TicketSlice.actions;

export default TicketSlice.reducer;
