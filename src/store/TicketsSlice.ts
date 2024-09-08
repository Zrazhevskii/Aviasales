import { createSlice } from '@reduxjs/toolkit';
import { TicketsState } from '../interfase/tucketsInterface';

const initialState: TicketsState = {
    tickets: [
        {
            price: 13600,
            // Код авиакомпании (iata)
            carrier: 'https://pics.avs.io/300/300/UN.png',
            // Массив перелётов.
            // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
            segments: [
                {
                    // Код города (iata)
                    origin: 'Благород',
                    // Код города (iata)
                    destination: 'Блягород2',
                    // Дата и время вылета туда
                    date: '20 сентября 2024 года',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['Уфа', 'Тула'],
                    // Общее время перелёта в минутах
                    duration: 22000,
                },
                {
                    // Код города (iata)
                    origin: 'Благород',
                    // Код города (iata)
                    destination: 'Благород2',
                    // Дата и время вылета обратно
                    date: '20 сентября 2024 года',
                    // Массив кодов (iata) городов с пересадками
                    stops: ['Уфа', 'Тула'],
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
