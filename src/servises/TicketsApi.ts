import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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
                await dispatch(getTickets(id));
                return response.data;
            }
            return { tickets: [], stop: true };
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status) {
                if (err.response?.status >= 500) {
                    await dispatch(getTickets(id));
                } else {
                    return rejectWithValue(err.message);
                }
            }
        }
    },
);
