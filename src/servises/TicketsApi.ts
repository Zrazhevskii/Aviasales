import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const idUrl = 'https://aviasales-test-api.kata.academy/search';

export const getSearchId = createAsyncThunk('idName/fetchIdName', (_, { rejectWithValue }) => {
    const response = axios
        .get(idUrl)
        .then((data) => {
            return sessionStorage.setItem('searchId', data.data.searchId);
        })
        .catch((error) => rejectWithValue(error.message));
    return response;
});

export const getTickets = createAsyncThunk('ticketsArr/fetchTickets', (_, { rejectWithValue }) => {
    const response = axios
        .get(`https://aviasales-test-api.kata.academy/tickets`, {
            params: {
                searchId: sessionStorage.getItem('searchId'),
            },
        })
        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            rejectWithValue(error.message);
        });
    return response;
});
