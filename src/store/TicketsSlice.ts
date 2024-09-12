import { createSlice, PayloadAction, UnknownAction } from '@reduxjs/toolkit';
import { TicketItem, TicketsState } from '../interfase/tucketsInterface';
import { getSearchId, getTickets } from '../servises/TicketsApi';

function isError(action: UnknownAction) {
    return action.type.endsWith('rejected');
}

const initialState: TicketsState = {
    tickets: [
        // {
        //     price: 19950,
        //     carrier: 'UN',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2024-07-07T19:23:37.881Z',
        //             stops: ['DXB', 'JNB', 'JNB'],
        //             duration: 1214,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2024-10-03T10:37:28.129Z',
        //             stops: ['DXB'],
        //             duration: 1415,
        //         },
        //     ],
        // },
        // {
        //     price: 31730,
        //     carrier: 'DP',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2025-03-15T17:16:05.864Z',
        //             stops: ['IST', 'HKG'],
        //             duration: 1096,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2025-11-25T07:28:09.038Z',
        //             stops: ['DOH'],
        //             duration: 960,
        //         },
        //     ],
        // },
        // {
        //     price: 10950,
        //     carrier: 'KL',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2024-07-07T19:23:37.881Z',
        //             stops: ['DXB'],
        //             duration: 1231,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2024-10-03T10:37:28.129Z',
        //             stops: ['DXB', 'JNB', 'KTR'],
        //             duration: 1005,
        //         },
        //     ],
        // },
        // {
        //     price: 9730,
        //     carrier: 'DP',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2025-03-15T17:16:05.864Z',
        //             stops: [],
        //             duration: 1206,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2025-11-25T07:28:09.038Z',
        //             stops: [],
        //             duration: 984,
        //         },
        //     ],
        // },
        // {
        //     price: 27950,
        //     carrier: 'AK',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2024-07-07T19:23:37.881Z',
        //             stops: ['DXB', 'JNB'],
        //             duration: 1202,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2024-10-03T10:37:28.129Z',
        //             stops: ['DXB', 'JNB', 'KTR'],
        //             duration: 1425,
        //         },
        //     ],
        // },
        // {
        //     price: 21730,
        //     carrier: 'DP',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2025-03-15T17:16:05.864Z',
        //             stops: ['IST', 'HKG'],
        //             duration: 1106,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2025-11-25T07:28:09.038Z',
        //             stops: [],
        //             duration: 990,
        //         },
        //     ],
        // },
        // {
        //     price: 36230,
        //     carrier: 'DP',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2025-03-15T17:16:05.864Z',
        //             stops: [],
        //             duration: 1246,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2025-11-25T07:28:09.038Z',
        //             stops: [],
        //             duration: 1084,
        //         },
        //     ],
        // },
        // {
        //     price: 10050,
        //     carrier: 'AK',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2024-07-07T19:23:37.881Z',
        //             stops: ['DXB', 'JNB'],
        //             duration: 1314,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2024-10-03T10:37:28.129Z',
        //             stops: ['DXB'],
        //             duration: 1025,
        //         },
        //     ],
        // },
        // {
        //     price: 22730,
        //     carrier: 'DP',
        //     segments: [
        //         {
        //             origin: 'MOW',
        //             destination: 'HKT',
        //             date: '2025-03-15T17:16:05.864Z',
        //             stops: [],
        //             duration: 1206,
        //         },
        //         {
        //             origin: 'HKT',
        //             destination: 'MOW',
        //             date: '2025-11-25T07:28:09.038Z',
        //             stops: [],
        //             duration: 1984,
        //         },
        //     ],
        // },
    ],
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
        // addCopyTickets подудаление
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
            // state.copyTickets = payload;
            state.copyTickets = payload.sort((a, b) => (a.price > b.price ? 1 : -1));
        },
        sortSpeedCopyTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload.sort((a, b) => {
                const sortedA = a.segments.reduce((acc, i) => acc + i.duration, 0);
                const sortedB = b.segments.reduce((acc, i) => acc + i.duration, 0);
                return sortedA > sortedB ? 1 : -1;
            });
            // state.copyTickets = state.copyTickets.sort((a, b) => (a.price > b.price ? 1 : -1));
        },
        sortOptimalCopyTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.copyTickets = payload.sort((a, b) => {
                const optimalA = a.segments.reduce((acc, i) => acc + i.duration, 0) + a.price;
                const optimalB = b.segments.reduce((acc, i) => acc + i.duration, 0) + b.price;
                return optimalA > optimalB ? 1 : -1;
            });
            // state.copyTickets = sortOptimal;
            // state.copyTickets = state.copyTickets.sort((a, b) => (a.price > b.price ? 1 : -1));
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
    addMoreTickets, // под удаление
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
