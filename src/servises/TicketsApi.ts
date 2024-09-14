import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// import { toggleStop } from '../store/TicketsSlice';

const idUrl = 'https://aviasales-test-api.kata.academy/search';
const ticketsUrl = `https://aviasales-test-api.kata.academy/tickets`;

export const getSearchId = createAsyncThunk('idName/fetchIdName', (_, { rejectWithValue }) => {
    const response = axios
        .get(idUrl)
        .then((data) => {
            return data.data.searchId;
        })
        .catch((error) => rejectWithValue(error.message));
    return response;
});

export const getTickets = createAsyncThunk(
    'ticketsArr/fetchTickets',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(ticketsUrl, {
                params: {
                    searchId: id,
                },
            });

            if (!response.data.stop) {
                console.log('я внутри getTickets при stop false');
                await dispatch(getTickets(id));
                return response.data;
            }
            console.log('я в API получил stop true');
            // dispatch(toggleStop(true));
            return { tickets: [], stop: true };
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status) {
                console.log('это статус ответа', err.response?.status);
                if (err.response?.status >= 500) {
                    console.log('Отправляю еще запрос на получение билетов после 500');
                    await dispatch(getTickets(id));
                } else {
                    console.log('я внутри error в другие ошибки, вот посылка - ', err.message);
                    return rejectWithValue(err.message);
                }
            }
        }

        // .then((data) => {
        //     if (!data.data.stop) {
        //         console.log('я внутри getTickets при stop false');
        //         dispatch(getTickets());
        //     }
        //     return data;
        // })
        // .catch((error) => {
        //     console.log('Это ошибка - ', error);
        //     if (error.data?.status >= 500) {
        //         getTickets();
        //     } else {
        //         console.log('Дошел до rejectWithValue', error.message);
        //         return rejectWithValue(error.message);
        //     }
        // });
    },
);
