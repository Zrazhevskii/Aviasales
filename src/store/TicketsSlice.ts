import { createSlice } from '@reduxjs/toolkit';
import { TicketsState } from '../interfase/tucketsInterface';

const initialState: TicketsState = {
    tickets: [
        {
            price: 13600,
            // Код авиакомпании (iata)
            carrier: 'UN',
            // Массив перелётов.
            // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
            segments: [
                {
                    // Код города (iata)
                    origin: 'Бля',
                    // Код города (iata)
                    destination: 'Бля2',
                    // Дата и время вылета туда
                    date: '10:45',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['Уфа - ', 'Тула'],
                    // Общее время перелёта в минутах
                    duration: 22000,
                },
                {
                    // Код города (iata)
                    origin: 'Фу',
                    // Код города (iata)
                    destination: 'Фу2',
                    // Дата и время вылета обратно
                    date: '10:45',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['Уфа - ', 'Тула'],
                    // Общее время перелёта в минутах
                    duration: 130000,
                },
            ],
        },
    ],
    loading: false,
    error: false,
};

const TicketSlice = createSlice({
    name: 'aviatickets',
    initialState,
    reducers: {
        addTickets: (state, action) => {
            console.log(state.tickets, action);
        },
    },
});

export const { addTickets } = TicketSlice.actions;
export default TicketSlice.reducer;
