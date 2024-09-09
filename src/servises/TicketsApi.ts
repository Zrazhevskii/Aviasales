import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorTicket, loadingTickets } from '../store/TicketsSlice';
// import { useAppDispatch } from '../hooks/hooks';

// if (!localStorage.getItem('searchId')) {
//     localStorage.setItem('searchId', 'd52e0b280cec70a79b39f1de4e2002d0');
// }
const idUrl = 'https://aviasales-test-api.kata.academy/search';
// const dispatch = useAppDispatch();

const getSearchId = createAsyncThunk('idName/fetchIdName', (_, { dispatch }) => {
    const response = axios
        .get(idUrl)
        .then((data) => {
            localStorage.setItem('searchId', data.data.searchId);
        })
        .catch(() => dispatch(errorTicket(true)));
    return response;
});

export const getTickets = createAsyncThunk('ticketsArr/fetchTickets', (_, { dispatch }) => {
    dispatch(loadingTickets());
    const apiId = localStorage.getItem('searchId');

    const response = axios
        .get('https://aviasales-test-api.kata.academy/tickets', {
            params: {
                searchId: apiId,
            },
        })
        .then((data) => {
            console.log(data);
            dispatch(loadingTickets());
        })
        .catch((error) => {
            console.log(error);
            dispatch(errorTicket(true));
        });
    return response;
});

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
