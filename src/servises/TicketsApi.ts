import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { errorTicket } from '../store/TicketsSlice';
import { TicketItem } from '../interfase/tucketsInterface';

const idUrl = 'https://aviasales-test-api.kata.academy/search';

const getSearchId = createAsyncThunk('idName/fetchIdName', (_, { rejectWithValue }) => {
    const response = axios
        .get(idUrl)
        .then((data) => {
            return localStorage.setItem('searchId', data.data.searchId);
        })
        .catch((error) => rejectWithValue(error.message));
    return response;
});

export const getTickets = createAsyncThunk<TicketItem[], { rejectWithValue: string }>(
    'ticketsArr/fetchTickets',
    (_, { rejectWithValue }) => {
        const apiId = localStorage.getItem('searchId');

        const response = axios
            .get('https://aviasales-test-api.kata.academy/tickets', {
                params: {
                    searchId: apiId,
                },
            })
            .then((data) => {
                // if (!data) {
                return data.data;
                // }
            })
            .catch((error) => rejectWithValue(error.message));
        return response;
    },
);

// getSearchId();

// const getSearchIdTwo = () => {
//     console.log('я мать его здесь или нет getSearchIdTwo');
//     const response = axios
//         .get('https://aviasales-test-api.kata.academy/search')
//         .then((data) => {
//             console.log('это айди - ', data);
//             return data;
//         })
//         .catch((error) => console.log('это ошибка - ', error));
//     return response;
// };

export default getSearchId;

// getSearchIdTwo();
