import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketItem, TicketsState } from '../interfase/tucketsInterface';
import { getTickets } from '../servises/TicketsApi';

const initialState: TicketsState = {
    tickets: [
        {
            price: 19950,
            // Код авиакомпании (iata)
            carrier: 'AK',
            // Массив перелётов.
            // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
            segments: [
                {
                    // Код города (iata)
                    origin: 'MOW',
                    // Код города (iata)
                    destination: 'HKT',
                    // Дата и время вылета туда
                    date: '2024-07-07T19:23:37.881Z',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['DXB', 'JNB'],
                    // Общее время перелёта в минутах
                    duration: 1214,
                },
                {
                    // Код города (iata)
                    origin: 'HKT',
                    // Код города (iata)
                    destination: 'MOW',
                    // Дата и время вылета обратно
                    date: '2024-10-03T10:37:28.129Z',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['DXB', 'JNB', 'KTR'],
                    // Общее время перелёта в минутах
                    duration: 1425,
                },
            ],
        },
        {
            price: 31730,
            // Код авиакомпании (iata)
            carrier: 'DP',
            // Массив перелётов.
            // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
            segments: [
                {
                    // Код города (iata)
                    origin: 'MOW',
                    // Код города (iata)
                    destination: 'HKT',
                    // Дата и время вылета туда
                    date: '2025-03-15T17:16:05.864Z',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['IST', 'HKG'],
                    // Общее время перелёта в минутах
                    duration: 1206,
                },
                {
                    // Код города (iata)
                    origin: 'HKT',
                    // Код города (iata)
                    destination: 'MOW',
                    // Дата и время вылета обратно
                    date: '2025-11-25T07:28:09.038Z',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['DOH'],
                    // Общее время перелёта в минутах
                    duration: 984,
                },
            ],
        },
    ],
    loading: false,
    error: false,
    showMoreTickets: 5,
};

const TicketSlice = createSlice({
    name: 'aviatickets',
    initialState,
    reducers: {
        addTickets: (state, { payload }: PayloadAction<TicketItem[]>) => {
            state.tickets = [...state.tickets, ...payload];
        },
        errorTicket: (state, { payload }: PayloadAction<boolean>) => {
            state.error = payload;
        },
        loadingTickets: (state) => {
            state.loading = !state.loading;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTickets.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.tickets = [...state.tickets, ...payload];
            })
            .addCase(getTickets.rejected, (state) => {
                state.error = true;
            });
    },
});

export const { addTickets, errorTicket, loadingTickets } = TicketSlice.actions;
export default TicketSlice.reducer;
